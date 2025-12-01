import wordService from '../services/wordService.js';
import { invalidId, throwIfNotFound } from '../utils/errorUtils.js';

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await wordService.getAllTasks();
        throwIfNotFound(tasks, 'Word not found');
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid task ID');
        const task = await wordService.getTaskById(req.params.id);
        throwIfNotFound(task, 'Word not found');
        res.json(task);
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req, res, next) => {
    try {
        const task = await wordService.createTask(req.body);
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

        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Something went wrong'
        });
    }
};

export const updateTask = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid task ID');
        const task = await wordService.updateTask(req.params.id, req.body);
        throwIfNotFound(task, 'Word not found');
        res.json({ status: 'success', data: task });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid task ID');
        const task = await wordService.deleteTask(req.params.id);
        throwIfNotFound(task, 'Word not found');
        res.json({ message: 'Word deleted' });
    } catch (error) {
        next(error);
    }
};