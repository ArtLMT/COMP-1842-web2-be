import User from '../models/User.js';

const userService = {
    getAllUsers: async () => {
        try {
            return await User.find({ isDeleted: false }).populate('role', 'description');
        } catch (err) {
            console.error('Error fetching all users:', err);
            throw err;
        }
    },

    getUserById: async (id) => {
        try {
            return await User.findOne({ _id: id, isDeleted: false });

        } catch (error) {
            throw error;
        }
    },

    createUser: async (userData) => {
        const user = new User(userData);
        return await user.save();
    },

    updateUser: async (id, userData) => {
        return User.findByIdAndUpdate(id, userData, { new: true });
    },

    deleteUser: async (id) => {
        return User.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    }
};

export default userService;