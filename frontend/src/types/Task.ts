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

// Backend returns capitalized properties
export interface ApiResponse<T> {
  Success: boolean;
  Message: string;
  Data?: T;
  Error?: string;
}
