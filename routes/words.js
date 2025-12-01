import express from 'express';
import * as wordController from '../controllers/wordController.js';
const router = express.Router();

router.get('/', wordController.getAllTasks);
router.get('/:id', wordController.getTaskById);
router.post('/', wordController.createTask);
router.put('/:id', wordController.updateTask);
router.delete('/:id', wordController.deleteTask);

export default router;