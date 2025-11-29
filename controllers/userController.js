// Ví dụ: controllers/userController.js (Đã refactor sang ES Modules)

import * as userService from '../services/userService.js'; // Import Named Exports từ Service
import { invalidId, throwIfNotFound } from '../utils/errorUtils.js'; // Import Named Exports từ Utils

export const getUserById = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid user ID');
        const user = await userService.getUserById(req.params.id);
        throwIfNotFound(user, 'User not found');
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const getAllUser = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        throwIfNotFound(users, 'User not found');
        res.json(users);
    } catch (error) {
        next(error);
    }
}


export const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req,res, next) => {
    try {
        invalidId(req.params.id, 'Invalid user ID');
        const user = await userService.updateUser(req.params.id, req.body);
        throwIfNotFound(user, 'User not found');
        res.json({ status: 'success', data: user });
    }
    catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid user ID');
        const user = await userService.deleteUser(req.params.id);
        throwIfNotFound(user, 'User not found');
        res.json({ message: 'User deleted' });
    } catch (error) {
        next(error);
    }
}