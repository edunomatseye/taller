import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types/task';
import * as taskApi from '../api/tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await taskApi.fetchTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      await taskApi.createTask(task);
      await fetchTasks();
      setError('');
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      await fetchTasks();
      setError('');
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, error, isLoading, createTask, deleteTask };
}