import express from 'express';
import * as userController from '../controllers/userController.js'; // Thêm đuôi file .js

const router = express.Router();

// Route mapping
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Sử dụng Default Export để export đối tượng router
export default router;