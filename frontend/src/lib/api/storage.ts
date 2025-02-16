import { Dashboard } from '../../types';

const STORAGE_KEY = 'task_management_data';

interface StorageData {
  dashboards: Dashboard[];
}

export const storage = {
  getData: (): StorageData => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return {
          dashboards: [],
        };
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading from storage:', error);
      return {
        dashboards: [],
      };
    }
  },

  setData: (data: StorageData): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  },

  clearData: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Helper method to simulate API latency
  simulateLatency: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
  }
};