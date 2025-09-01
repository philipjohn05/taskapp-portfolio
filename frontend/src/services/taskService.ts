import axios from 'axios';
import type { Task, CreateTaskDto, UpdateTaskDto, ApiResponse } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://func-taskapp-35783.azurewebsites.net/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Full API Error Details:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
      responseHeaders: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      }
    });
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your connection.');
    }
    if (error.response?.data) {
      const errorData = error.response.data;
      if (errorData.Error) {
        throw new Error(`Backend Error: ${errorData.Error}`);
      }
      if (errorData.Message) {
        throw new Error(`API Error: ${errorData.Message}`);
      }
    }
    if (error.response) {
      throw new Error(`HTTP ${error.response.status}: ${error.response.statusText}`);
    }
    if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    }
    throw new Error(`Request failed: ${error.message}`);
  }
);

export const taskService = {
  async getTasks(): Promise<Task[]> {
    try {
      console.log('Fetching tasks from:', API_BASE_URL + '/tasks');
      const response = await api.get<ApiResponse<Task[]>>('/tasks');
      console.log('Get tasks response:', response.data);
      return response.data.data || [];
    } catch (error) {
      console.error('getTasks error:', error);
      throw error;
    }
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
    try {
      console.log('Creating task:', task);
      console.log('POST to:', API_BASE_URL + '/tasks');
      
      const response = await api.post<ApiResponse<Task>>('/tasks', task);
      console.log('Create task full response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers
      });
      
      if (!response.data.success && !response.data.Success) {
        throw new Error(response.data.error || response.data.Error || response.data.message || response.data.Message || 'Failed to create task');
      }
      
      // Handle both success and Success properties (case sensitivity)
      const taskData = response.data.data || response.data.Data;
      if (!taskData) {
        throw new Error('No task data returned from server');
      }
      
      return taskData;
    } catch (error) {
      console.error('createTask error:', error);
      throw error;
    }
  },

  async updateTask(id: number, task: UpdateTaskDto): Promise<Task> {
    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to update task');
    }
    return response.data.data!;
  },

  async deleteTask(id: number): Promise<void> {
    const response = await api.delete<ApiResponse<boolean>>(`/tasks/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete task');
    }
  },

  async healthCheck(): Promise<any> {
    const response = await api.get('/health');
    return response.data;
  }
};
