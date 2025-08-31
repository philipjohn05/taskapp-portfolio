export interface Task {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: number;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
  userId: string;
  tags?: string;
  categoryId?: number;
  categoryName?: string;
  categoryColor?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority: number;
  dueDate?: string;
  tags?: string;
  categoryId?: number;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  priority?: number;
  dueDate?: string;
  tags?: string;
  categoryId?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
