import React, { useState } from 'react';
import { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, updates: any) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleToggleComplete = async () => {
    await onUpdate(task.id, { isCompleted: !task.isCompleted });
  };

  const handleSaveEdit = async () => {
    await onUpdate(task.id, { 
      title: editTitle, 
      description: editDescription 
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'priority-high';
      case 2: return 'priority-medium';
      case 3: return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1: return 'High';
      case 2: return 'Medium';
      case 3: return 'Low';
      default: return 'Medium';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`card task-item ${task.isCompleted ? 'task-completed' : ''}`}>
      <div className="task-header">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleToggleComplete}
            className="checkbox"
          />
        </div>
        
        <div className="task-content">
          {isEditing ? (
            <div className="task-edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-input"
                placeholder="Task title..."
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="edit-textarea"
                placeholder="Task description..."
                rows={2}
              />
              <div className="edit-buttons">
                <button onClick={handleSaveEdit} className="btn-save">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="task-title">
                <h3 className={task.isCompleted ? 'completed' : ''}>{task.title}</h3>
                <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                  {getPriorityText(task.priority)}
                </span>
              </div>
              
              {task.description && (
                <p className={`task-description ${task.isCompleted ? 'completed' : ''}`}>
                  {task.description}
                </p>
              )}
              
              <div className="task-meta">
                <span className="task-date">
                  Created: {formatDate(task.createdAt)}
                </span>
                {task.dueDate && (
                  <span className="task-due-date">
                    Due: {formatDate(task.dueDate)}
                  </span>
                )}
                {task.tags && (
                  <span className="task-tags">
                    {task.tags.split(',').map(tag => tag.trim()).join(', ')}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="task-actions">
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn-edit"
              title="Edit task"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(task.id)} 
              className="btn-delete"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
