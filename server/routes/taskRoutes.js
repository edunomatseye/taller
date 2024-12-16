import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

router.get('/items', taskController.getAllTasks);
router.post('/items', taskController.createTask);
router.delete('/items/:id', taskController.deleteTask);

export default router;