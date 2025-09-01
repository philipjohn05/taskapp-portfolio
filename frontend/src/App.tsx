import { useState, useEffect } from 'react';
import './App.css';
import type { Task, CreateTaskDto } from './types/Task';
import { taskService } from './services/taskService';
import TaskForm from './components/Tasks/TaskForm';
import TaskList from './components/Tasks/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDto) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setError(null);
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (id: number, updates: any) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates);
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === id ? updatedTask : task)
      );
      setError(null);
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const pendingTasks = tasks.filter(task => !task.isCompleted).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TaskApp Portfolio
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Full-Stack Azure Task Management System
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="bg-blue-100 px-3 py-1 rounded">
              <span className="font-semibold text-blue-800">Total: {tasks.length}</span>
            </div>
            <div className="bg-green-100 px-3 py-1 rounded">
              <span className="font-semibold text-green-800">Completed: {completedTasks}</span>
            </div>
            <div className="bg-orange-100 px-3 py-1 rounded">
              <span className="font-semibold text-orange-800">Pending: {pendingTasks}</span>
            </div>
          </div>
        </header>

        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <div className="flex justify-between items-center">
                <span>{error}</span>
                <button 
                  onClick={() => setError(null)}
                  className="text-red-700 hover:text-red-900"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div>
              <TaskForm onCreateTask={handleCreateTask} />
              
              <div className="card mt-6">
                <h3 className="text-lg font-semibold mb-3">System Info</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Frontend:</strong> Azure Static Web Apps</p>
                  <p><strong>Backend:</strong> Azure Functions (.NET)</p>
                  <p><strong>Database:</strong> Azure SQL Database</p>
                  <p><strong>CI/CD:</strong> GitHub Actions</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Your Tasks ({tasks.length})
              </h2>
              <TaskList 
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
