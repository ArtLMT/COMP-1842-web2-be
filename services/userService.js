const User = require('../models/user');
const {Types} = require('mongoose');

exports.getAllUsers = async  () => {
    try {
        return await User.find({isDeleted: false }).populate('role', 'description');
    } catch (err) {
        console.error('Error fetching all users:', err);
        throw err;
    }
}

exports.getUserById = async (id) => {
    try {
        return await User.findById({_id: id, isDeleted: false })

    } catch (error) {
        throw error;
    }
}

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
}

exports.updateUser = async (id, userData) => {
    return User.findByIdAndUpdate(id, userData, {new: true});
}

exports.deleteUser = async (id) => {
    return User.findByIdAndUpdate(
        id,
        {isDeleted: true},
        {new: true}
    )
}