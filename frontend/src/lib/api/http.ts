import { ApiResponse } from '../../types';

const API_URL = import.meta.env.VITE_API_URL;

export class HttpClient {
  static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      console.log(`API Call (GET): ${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`);
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`API Error (GET ${endpoint}):`, error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          code: 'API_ERROR'
        }
      };
    }
  }

  static async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      console.log(`API Call (POST): ${endpoint}`, body);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`API Error (POST ${endpoint}):`, error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          code: 'API_ERROR'
        }
      };
    }
  }

  static async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      console.log(`API Call (PUT): ${endpoint}`, body);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`API Error (PUT ${endpoint}):`, error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          code: 'API_ERROR'
        }
      };
    }
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      console.log(`API Call (DELETE): ${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(`API Error (DELETE ${endpoint}):`, error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          code: 'API_ERROR'
        }
      };
    }
  }
}