import { GraphQLAPI } from './graphql';
import { ApiClient } from './axios';
import { storage } from './storage';
import { 
  User, Dashboard, Card, Column, 
  ApiResponse, PaginatedResponse 
} from '../../types';

class API {
  private static api = ApiClient.getInstance();

  // Auth methods
  static async login(email: string, password: string): Promise<User> {
    try {
      return await GraphQLAPI.login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
      // Fallback to mock data
      return {
        id: 'user-1',
        email,
      };
    }
  }

  static async register(email: string, password: string): Promise<User> {
    try {
      return await GraphQLAPI.register(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      // Fallback to mock data
      return {
        id: `user-${Date.now()}`,
        email,
      };
    }
  }

  // Dashboard methods
  static async getDashboards(): Promise<Dashboard[]> {
    try {
      return await GraphQLAPI.getDashboards();
    } catch (error) {
      console.error('Failed to fetch dashboards:', error);
      // Fallback to local storage
      const data = storage.getData();
      if (data.dashboards.length === 0) {
        const initialDashboard = this.generateInitialDashboard('user-1');
        data.dashboards.push(initialDashboard);
        storage.setData(data);
      }
      return data.dashboards;
    }
  }

  static async createDashboard(title: string, userId: string): Promise<Dashboard> {
    try {
      return await GraphQLAPI.createDashboard(title, userId);
    } catch (error) {
      console.error('Failed to create dashboard:', error);
      // Fallback to local storage
      const dashboard = this.generateInitialDashboard(userId, title);
      const data = storage.getData();
      data.dashboards.push(dashboard);
      storage.setData(data);
      return dashboard;
    }
  }

  static async updateDashboard(
    dashboardId: string, 
    updates: Partial<Dashboard>
  ): Promise<Dashboard> {
    try {
      const response = await this.api.put<Dashboard>(
        `/dashboards/${dashboardId}`,
        updates
      );

      if (response.error) throw response.error;
      return response.data!;
    } catch (error) {
      console.error('Failed to update dashboard:', error);
      // Fallback to local storage
      const data = storage.getData();
      const index = data.dashboards.findIndex(d => d.id === dashboardId);
      if (index === -1) throw new Error('Dashboard not found');

      const updatedDashboard = {
        ...data.dashboards[index],
        ...updates,
      };
      data.dashboards[index] = updatedDashboard;
      storage.setData(data);
      return updatedDashboard;
    }
  }

  // Column methods
  static async createColumn(
    dashboardId: string, 
    title: string
  ): Promise<Column> {
    try {
      const response = await this.api.post<Column>(
        `/dashboards/${dashboardId}/columns`,
        { title }
      );

      if (response.error) throw response.error;
      return response.data!;
    } catch (error) {
      console.error('Failed to create column:', error);
      // Fallback to local storage
      const data = storage.getData();
      const dashboard = data.dashboards.find(d => d.id === dashboardId);
      if (!dashboard) throw new Error('Dashboard not found');

      const column: Column = {
        id: `column-${Date.now()}`,
        title,
        order: dashboard.columns.length,
        cards: [],
      };

      dashboard.columns.push(column);
      storage.setData(data);
      return column;
    }
  }

  static async updateColumnOrder(
    dashboardId: string, 
    columnIds: string[]
  ): Promise<void> {
    try {
      const response = await this.api.put<void>(
        `/dashboards/${dashboardId}/columns/order`,
        { columnIds }
      );

      if (response.error) throw response.error;
    } catch (error) {
      console.error('Failed to update column order:', error);
      // Fallback to local storage
      const data = storage.getData();
      const dashboard = data.dashboards.find(d => d.id === dashboardId);
      if (!dashboard) throw new Error('Dashboard not found');

      dashboard.columns = columnIds.map((id, index) => {
        const column = dashboard.columns.find(c => c.id === id);
        if (!column) throw new Error('Column not found');
        return { ...column, order: index };
      });

      storage.setData(data);
    }
  }

  // Card methods
  static async createCard(
    dashboardId: string, 
    columnId: string, 
    title: string
  ): Promise<Card> {
    try {
      const response = await this.api.post<Card>(
        `/dashboards/${dashboardId}/columns/${columnId}/cards`,
        { title }
      );

      if (response.error) throw response.error;
      return response.data!;
    } catch (error) {
      console.error('Failed to create card:', error);
      // Fallback to local storage
      const data = storage.getData();
      const dashboard = data.dashboards.find(d => d.id === dashboardId);
      if (!dashboard) throw new Error('Dashboard not found');

      const column = dashboard.columns.find(c => c.id === columnId);
      if (!column) throw new Error('Column not found');

      const card: Card = {
        id: `card-${Date.now()}`,
        number: Date.now(),
        title,
        columnId,
        description: '',
        members: [],
        labels: [],
        checklists: [],
        comments: [],
      };

      column.cards.push(card);
      storage.setData(data);
      return card;
    }
  }

  static async updateCard(
    dashboardId: string,
    columnId: string,
    cardId: string,
    updates: Partial<Card>
  ): Promise<Card> {
    try {
      const response = await this.api.put<Card>(
        `/dashboards/${dashboardId}/columns/${columnId}/cards/${cardId}`,
        updates
      );

      if (response.error) throw response.error;
      return response.data!;
    } catch (error) {
      console.error('Failed to update card:', error);
      // Fallback to local storage
      const data = storage.getData();
      const dashboard = data.dashboards.find(d => d.id === dashboardId);
      if (!dashboard) throw new Error('Dashboard not found');

      const column = dashboard.columns.find(c => c.id === columnId);
      if (!column) throw new Error('Column not found');

      const cardIndex = column.cards.findIndex(c => c.id === cardId);
      if (cardIndex === -1) throw new Error('Card not found');

      const updatedCard = {
        ...column.cards[cardIndex],
        ...updates,
      };

      column.cards[cardIndex] = updatedCard;
      storage.setData(data);
      return updatedCard;
    }
  }

  static async moveCard(
    dashboardId: string,
    fromColumnId: string,
    toColumnId: string,
    cardId: string,
    newIndex: number
  ): Promise<void> {
    try {
      const response = await this.api.put<void>(
        `/dashboards/${dashboardId}/cards/${cardId}/move`,
        {
          fromColumnId,
          toColumnId,
          newIndex,
        }
      );

      if (response.error) throw response.error;
    } catch (error) {
      console.error('Failed to move card:', error);
      // Fallback to local storage
      const data = storage.getData();
      const dashboard = data.dashboards.find(d => d.id === dashboardId);
      if (!dashboard) throw new Error('Dashboard not found');

      const fromColumn = dashboard.columns.find(c => c.id === fromColumnId);
      const toColumn = dashboard.columns.find(c => c.id === toColumnId);
      if (!fromColumn || !toColumn) throw new Error('Column not found');

      const cardIndex = fromColumn.cards.findIndex(c => c.id === cardId);
      if (cardIndex === -1) throw new Error('Card not found');

      const [card] = fromColumn.cards.splice(cardIndex, 1);
      toColumn.cards.splice(newIndex, 0, card);
      storage.setData(data);
    }
  }

  // Helper method to generate initial dashboard
  private static generateInitialDashboard(
    userId: string, 
    title = 'My First Board'
  ): Dashboard {
    return {
      id: `dashboard-${Date.now()}`,
      title,
      ownerIds: [userId],
      members: [{ id: userId, email: 'user@example.com' }],
      createdAt: new Date().toISOString(),
      columns: [
        {
          id: 'column-1',
          title: 'To Do',
          order: 0,
          cards: [],
        },
        {
          id: 'column-2',
          title: 'In Progress',
          order: 1,
          cards: [],
        },
        {
          id: 'column-3',
          title: 'Done',
          order: 2,
          cards: [],
        },
      ],
    };
  }
}

export { API };