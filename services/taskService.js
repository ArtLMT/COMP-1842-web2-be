const Task = require('../models/Task');
const {Types} = require("mongoose");

exports.getAllTasks = async () => {
    try {
        return await Task.find().populate('user_id', 'name email');
    } catch (err) {
        console.error('Error fetching all tasks:', err);
        throw new Error('Failed to fetch tasks');
    }
};

exports.getTaskById = async (id) => {
    try {
        if (!id || !Types.ObjectId.isValid(id)) {
            throw new Error('Invalid task ID');
        }

        const task = await Task.findById(id).populate('user_id', 'name email');
        if (!task) {
            throw new Error('Task not found');
        }

        return task;
    } catch (err) {
        console.error(`Error fetching task with id ${id}:`, err.message);
        throw new Error(`Failed to fetch task: ${err.message}`);
    }
};

exports.createTask = async (taskData) => {
    try {
        const task = new Task(taskData);
        return await task.save();
    } catch (err) {
        console.error('Error creating task:', err);
        throw new Error('Failed to create task');
    }
};

exports.updateTask = async (id, taskData) => {
    try {
        return await Task.findByIdAndUpdate(id, taskData, { new: true });
    } catch (err) {
        console.error(`Error updating task with id ${id}:`, err);
        throw new Error('Failed to update task');
    }
};

exports.deleteTask = async (id) => {
    try {
        return await Task.findByIdAndDelete(id);
    } catch (err) {
        console.error(`Error deleting task with id ${id}:`, err);
        throw new Error('Failed to delete task');
    }
};
