const Task = require('../models/Task');
const {Types} = require("mongoose");
const { invalidId } = require('../utils/errorUtils');


exports.getAllTasks = async () => {
    try {
        return await Task.find({ isDeleted: false }).populate('user_id', 'displayName email');
    } catch (err) {
        console.error('Error fetching all tasks:', err);
        throw err;
    }
};

exports.getTaskById = async (id) => {
    return await Task.findById({ _id: id, isDeleted: false }).populate('user_id', 'displayName email');
};


exports.createTask = async (taskData) => {
    const task = new Task(taskData);
    return await task.save();

};

exports.updateTask = async (id, taskData) => {
    return Task.findByIdAndUpdate(id, taskData, {new: true, runValidators: true});
};

exports.deleteTask = async (id) => {
    // return Task.findByIdAndDelete(id);

    // soft delete
    return Task.findByIdAndUpdate(
        id,
        {isDeleted: true},
        {new: true}
    );
};
