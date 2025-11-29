// Ví dụ: routes/tasks.js (Đã refactor sang ES Modules)

import express from 'express';
// Sử dụng Named Import để lấy các hàm controller đã được export
import * as taskController from '../controllers/taskController.js'; // Thêm đuôi file .js

const router = express.Router();

// Route mapping
router.get('/', taskController.getTasks); // Hoặc taskController.getAllTasks nếu bạn đã đổi tên
router.get('/:id', taskController.getTaskById);
// router.get('/status/:status', taskController.getTaskByStatus)
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Sử dụng Default Export để export đối tượng router
export default router;