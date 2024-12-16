import { TaskStatus, TaskPriority } from '../models/task.js';

let tasks = [];
let nextId = 1;

export function getAllTasks(req, res) {
  res.json(tasks);
}

export function createTask(req, res) {
  const { title, description, status, priority, dueDate } = req.body;
  
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string' });
  }

  if (!Object.values(TaskStatus).includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  if (!Object.values(TaskPriority).includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority value' });
  }

  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    status,
    priority,
    dueDate,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
}

export function deleteTask(req, res) {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
}