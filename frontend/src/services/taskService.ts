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

// Helper function to map backend task data to frontend format
const mapBackendTask = (backendTask: any): Task => ({
  id: backendTask.Id,
  title: backendTask.Title,
  description: backendTask.Description,
  isCompleted: backendTask.IsCompleted,
  priority: backendTask.Priority,
  dueDate: backendTask.DueDate,
  createdAt: backendTask.CreatedAt,
  completedAt: backendTask.CompletedAt,
  userId: backendTask.UserId,
  tags: backendTask.Tags,
  categoryId: backendTask.CategoryId,
  categoryName: backendTask.CategoryName,
  categoryColor: backendTask.CategoryColor,
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
      const response = await api.get<ApiResponse<any[]>>('/tasks');
      console.log('Get tasks response:', response.data);
      
      if (!response.data.Data) {
        return [];
      }
      
      // Map backend data to frontend format
      return response.data.Data.map(mapBackendTask);
    } catch (error) {
      console.error('getTasks error:', error);
      throw error;
    }
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
    try {
      console.log('Creating task:', task);
      console.log('POST to:', API_BASE_URL + '/tasks');
      
      const response = await api.post<ApiResponse<any>>('/tasks', task);
      console.log('Create task full response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
      
      if (!response.data.Success) {
        throw new Error(response.data.Error || response.data.Message || 'Failed to create task');
      }
      
      if (!response.data.Data) {
        throw new Error('No task data returned from server');
      }
      
      return mapBackendTask(response.data.Data);
    } catch (error) {
      console.error('createTask error:', error);
      throw error;
    }
  },

  async updateTask(id: number, task: UpdateTaskDto): Promise<Task> {
    try {
      console.log('Updating task:', id, task);
      console.log('PUT to:', `${API_BASE_URL}/tasks/${id}`);
      
      const response = await api.put<ApiResponse<any>>(`/tasks/${id}`, task);
      console.log('Update task response:', response.data);
      
      if (!response.data.Success) {
        throw new Error(response.data.Error || 'Failed to update task');
      }
      
      return mapBackendTask(response.data.Data);
    } catch (error) {
      console.error('updateTask error:', error);
      throw error;
    }
  },

  async deleteTask(id: number): Promise<void> {
    try {
      console.log('Deleting task:', id);
      const response = await api.delete<ApiResponse<boolean>>(`/tasks/${id}`);
      
      if (!response.data.Success) {
        throw new Error(response.data.Error || 'Failed to delete task');
      }
    } catch (error) {
      console.error('deleteTask error:', error);
      throw error;
    }
  },

  async healthCheck(): Promise<any> {
    const response = await api.get('/health');
    return response.data;
  }
};
