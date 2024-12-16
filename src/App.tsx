import React from 'react';
import { ListTodo } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { ErrorAlert } from './components/ErrorAlert';
import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks, error, isLoading, createTask, deleteTask } = useTasks();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <ListTodo className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>
        
        <ErrorAlert message={error} />

        <div className="space-y-8">
          <TaskForm onSubmit={createTask} />
          {isLoading ? (
            <div className="text-center text-gray-500">Loading tasks...</div>
          ) : (
            <TaskList tasks={tasks} onDelete={deleteTask} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;