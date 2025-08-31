import React from 'react';
import { Task } from '../../types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: number, updates: any) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
  loading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onUpdateTask, 
  onDeleteTask, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="card text-center">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card text-center text-gray-600">
        <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
