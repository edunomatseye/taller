import React from 'react';
import { Trash2, Clock, AlertCircle } from 'lucide-react';
import type { Task } from '../types/task';
import { TaskStatusBadge } from './TaskStatusBadge';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => Promise<void>;
}

export function TaskList({ tasks, onDelete }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                <TaskStatusBadge status={task.status} />
              </div>
              <p className="mt-1 text-gray-600">{task.description}</p>
              
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className={`flex items-center ${getPriorityColor(task.priority)}`}>
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
                
                {task.dueDate && (
                  <span className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                
                <span className="text-gray-500">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
      
      {tasks.length === 0 && (
        <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
      )}
    </div>
  );
}