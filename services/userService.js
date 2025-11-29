// Ví dụ: user.service.js (Refactor thành Object Literal)

import User from '../models/User.js'; // Import Model User
// Nếu cần Types, bạn có thể import từ mongoose
// import { Types } from 'mongoose';

const userService = {
    /**
     * Lấy tất cả người dùng chưa bị xóa, populate thông tin role.
     */
    getAllUsers: async () => {
        try {
            return await User.find({ isDeleted: false }).populate('role', 'description');
        } catch (err) {
            console.error('Error fetching all users:', err);
            throw err;
        }
    },

    /**
     * Lấy người dùng theo ID.
     */
    getUserById: async (id) => {
        try {
            // Lưu ý: findById đã nhận id làm tham số đầu tiên, không cần bọc trong object
            return await User.findOne({ _id: id, isDeleted: false });

        } catch (error) {
            throw error;
        }
    },

    /**
     * Tạo người dùng mới.
     */
    createUser: async (userData) => {
        const user = new User(userData);
        return await user.save();
    },

    /**
     * Cập nhật thông tin người dùng theo ID.
     */
    updateUser: async (id, userData) => {
        return User.findByIdAndUpdate(id, userData, { new: true });
    },

    /**
     * Xóa mềm (soft delete) người dùng.
     */
    deleteUser: async (id) => {
        // return User.findByIdAndDelete(id)

        return User.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    }
};

export default userService;