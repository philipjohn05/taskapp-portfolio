import axios from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto, ApiResponse } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7071/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await api.get<ApiResponse<Task[]>>('/tasks');
    return response.data.data || [];
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
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
