const taskService = require('../services/taskService');
const { invalidId, throwIfNotFound } = require('../utils/errorUtils');

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await taskService.getAllTasks();
        throwIfNotFound(tasks, 'Task not found');
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid task ID');
        const task = await taskService.getTaskById(req.params.id);
        throwIfNotFound(task, 'Task not found');
        res.json(task);
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        // Check if it's a Mongoose validation error
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

exports.updateTask = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid task ID');
        const task = await taskService.updateTask(req.params.id, req.body);
        throwIfNotFound(task, 'Task not found');
        res.json({ status: 'success', data: task });
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid task ID');
        const task = await taskService.deleteTask(req.params.id);
        throwIfNotFound(task, 'Task not found');
        res.json({ message: 'Task deleted' });
    } catch (error) {
        next(error);
    }
};
