import { create } from 'zustand';
import { API } from './lib/api';
import { Column, Card, Dashboard } from './types';

interface BoardState {
  dashboards: Dashboard[];
  currentDashboard: Dashboard | null;
  columns: Column[];
  loading: boolean;
  error: string | null;
  addDashboard: (title: string) => Promise<void>;
  setCurrentDashboard: (dashboardId: string) => Promise<void>;
  updateDashboard: (dashboardId: string, updates: Partial<Dashboard>) => Promise<void>;
  addColumn: (title: string) => Promise<void>;
  deleteColumn: (columnId: string) => void;
  archiveColumn: (columnId: string) => void;
  updateColumn: (column: Column) => void;
  addCard: (columnId: string, title: string) => Promise<void>;
  updateCard: (columnId: string, cardId: string, updatedCard: Partial<Card>) => Promise<void>;
  moveCard: (fromColumnId: string, toColumnId: string, fromIndex: number, toIndex: number) => Promise<void>;
  updateColumnOrder: (dashboardId: string, columnIds: string[]) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  dashboards: [],
  currentDashboard: null,
  columns: [],
  loading: false,
  error: null,

  addDashboard: async (title: string) => {
    try {
      set({ loading: true, error: null });
      const dashboard = await API.createDashboard(title, 'user1');
      set(state => ({
        dashboards: [...state.dashboards, dashboard],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setCurrentDashboard: async (dashboardId: string) => {
    try {
      set({ loading: true, error: null });
      const dashboards = await API.getDashboards();
      const currentDashboard = dashboards.find(d => d.id === dashboardId);
      if (!currentDashboard) {
        throw new Error('Dashboard not found');
      }

      // Subscribe to real-time updates for this dashboard

      set({
        currentDashboard,
        columns: currentDashboard.columns,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateDashboard: async (dashboardId: string, updates: Partial<Dashboard>) => {
    try {
      set({ loading: true, error: null });
      const updatedDashboard = await API.updateDashboard(dashboardId, updates);
      set(state => ({
        currentDashboard: updatedDashboard,
        dashboards: state.dashboards.map(d =>
          d.id === dashboardId ? updatedDashboard : d
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addColumn: async (title: string) => {
    const { currentDashboard } = get();
    if (!currentDashboard) return;

    try {
      set({ loading: true, error: null });
      const column = await API.createColumn(currentDashboard.id, title);
      set(state => ({
        columns: [...state.columns, column],
        loading: false,
      }));

      // Broadcast column update
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteColumn: (columnId: string) => {
    set(state => ({
      columns: state.columns.filter(column => column.id !== columnId),
    }));
  },

  archiveColumn: (columnId: string) => {
    set(state => ({
      columns: state.columns.filter(column => column.id !== columnId),
    }));
  },

  updateColumn: (column: Column) => {
    set(state => ({
      columns: state.columns.map(c => c.id === column.id ? column : c),
    }));
  },

  addCard: async (columnId: string, title: string) => {
    const { currentDashboard } = get();
    if (!currentDashboard) return;

    try {
      set({ loading: true, error: null });
      const card = await API.createCard(currentDashboard.id, columnId, title);
      set(state => ({
        columns: state.columns.map(column =>
          column.id === columnId
            ? { ...column, cards: [...column.cards, card] }
            : column
        ),
        loading: false,
      }));

      // Broadcast card update
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateCard: async (columnId: string, cardId: string, updatedCard: Partial<Card>) => {
    const { currentDashboard } = get();
    if (!currentDashboard) return;

    try {
      set({ loading: true, error: null });
      const card = await API.updateCard(currentDashboard.id, columnId, cardId, updatedCard);
      set(state => ({
        columns: state.columns.map(column =>
          column.id === columnId
            ? {
                ...column,
                cards: column.cards.map(c => (c.id === cardId ? card : c)),
              }
            : column
        ),
        loading: false,
      }));

      // Broadcast card update
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  moveCard: async (fromColumnId: string, toColumnId: string, fromIndex: number, toIndex: number) => {
    const { currentDashboard, columns } = get();
    if (!currentDashboard) return;

    const sourceColumn = columns.find(col => col.id === fromColumnId);
    if (!sourceColumn) return;

    const card = sourceColumn.cards[fromIndex];
    if (!card) return;

    // Update state immediately for smooth UI
    set(state => {
      const newColumns = state.columns.map(col => ({ ...col, cards: [...col.cards] }));
      const fromColumn = newColumns.find(col => col.id === fromColumnId);
      const toColumn = newColumns.find(col => col.id === toColumnId);

      if (!fromColumn || !toColumn) return state;

      const [movedCard] = fromColumn.cards.splice(fromIndex, 1);
      toColumn.cards.splice(toIndex, 0, movedCard);

      return { columns: newColumns };
    });

    try {
      await API.moveCard(currentDashboard.id, fromColumnId, toColumnId, card.id, toIndex);
      
      // Broadcast card move
      
    } catch (error) {
      // Revert the state if the API call fails
      set(state => ({ columns, error: (error as Error).message }));
    }
  },

  updateColumnOrder: async (dashboardId: string, columnIds: string[]) => {
    const { columns: originalColumns } = get();

    // Update state immediately for smooth UI
    set(state => {
      const newColumns = columnIds.map((columnId, index) => {
        const column = state.columns.find(c => c.id === columnId);
        if (!column) throw new Error('Column not found');
        return { ...column, order: index + 1 };
      });

      return { columns: newColumns };
    });

    try {
      await API.updateColumnOrder(dashboardId, columnIds);
      
      // Broadcast column order update
    } catch (error) {
      // Revert the state if the API call fails
      set({ columns: originalColumns, error: (error as Error).message });
    }
  },
}));