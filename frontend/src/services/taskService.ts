import axios from 'axios';
import type { Task, CreateTaskDto, UpdateTaskDto, ApiResponse } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://func-taskapp-35783.azurewebsites.net/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your connection.');
    }
    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
    }
    if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    }
    throw new Error(`Request failed: ${error.message}`);
  }
);

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await api.get<ApiResponse<Task[]>>('/tasks');
    return response.data.data || [];
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
    console.log('Creating task:', task);
    console.log('API URL:', API_BASE_URL);
    
    const response = await api.post<ApiResponse<Task>>('/tasks', task);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to create task');
    }
    return response.data.data!;
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
