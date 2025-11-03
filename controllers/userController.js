const userService = require('../services/userService');
const { invalidId, throwIfNotFound } = require('../utils/errorUtils');

exports.getUserById = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid user ID');
        const user = await userService.getUserById(req.params.id);
        throwIfNotFound(user, 'User not found');
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        throwIfNotFound(users, 'User not found');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (req,res, next) => {
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

exports.deleteUser = async (req, res, next) => {
    try {
        invalidId(req.params.id, 'Invalid user ID');
        const user = await userService.deleteUser(req.params.id);
        throwIfNotFound(user, 'User not found');
        res.json({ message: 'User deleted' });
    } catch (error) {
        next(error);
    }
}