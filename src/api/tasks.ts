import type { Task } from '../types/task';

const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/items`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
}