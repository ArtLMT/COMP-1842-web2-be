// Ví dụ: task.controller.js (Đã refactor sang ES Modules)

import taskService from '../services/taskService.js'; // Thêm đuôi file
import { invalidId, throwIfNotFound } from '../utils/errorUtils.js'; // Named import cho các hàm tiện ích

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await taskService.getAllTasks();
        throwIfNotFound(tasks, 'Task not found');
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid task ID');
        const task = await taskService.getTaskById(req.params.id);
        throwIfNotFound(task, 'Task not found');
        res.json(task);
    } catch (error) {
        next(error);
    }
};

export const getTask = async (req, res, next) => {
    try {
        const {status} = req.params;
        if (status && !['todo', 'in_progress', 'done'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        let tasks;
        if (status) {
            tasks = await taskService.getTaskByStatus(status);
        } else {
            tasks = await taskService.getAllTasks();
        }

        throwIfNotFound(tasks, 'Task not found');
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

export const getTasks = async (req, res, next) => {
    try {
        const { status } = req.query; // destructuring query params
        let tasks;

        if (status) {
            // Nếu có query ?status=...
            tasks = await taskService.getTaskByStatus(status);
        } else {
            // Nếu không có thì lấy tất cả
            tasks = await taskService.getAllTasks();
        }

        throwIfNotFound(tasks, 'Task not found');
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req, res, next) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                status: 'fail',
                message: 'Validation error',
                errors: messages
            });
        }

        // For other types of errors
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Something went wrong'
        });
    }
};

export const updateTask = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid task ID');
        const task = await taskService.updateTask(req.params.id, req.body);
        throwIfNotFound(task, 'Task not found');
        res.json({ status: 'success', data: task });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid task ID');
        const task = await taskService.deleteTask(req.params.id);
        throwIfNotFound(task, 'Task not found');
        res.json({ message: 'Task deleted' });
    } catch (error) {
        next(error);
    }
};