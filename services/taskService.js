// Ví dụ: task.service.js (Refactor thành Object Literal)

import Task from '../models/Task.js';
// Giả sử bạn muốn sử dụng các hàm tiện ích:
// import { invalidId } from '../utils/errorUtils.js';

const taskService = {
    /**
     * Lấy tất cả các Task chưa bị xóa.
     * @returns {Promise<Task[]>}
     */
    getAllTasks: async () => {
        try {
            return await Task.find({ isDeleted: false })
                .populate(
                    'user_id',
                    'displayName email'
                );
        } catch (err) {
            console.error('Error fetching all tasks:', err);
            throw err;
        }
    },

    /**
     * Lấy Task theo ID.
     * @param {string} id - ID của Task.
     * @returns {Promise<Task | null>}
     */
    getTaskById: async (id) => {
        return Task.findOne({
            _id: id,
            isDeleted: false
        }).populate(
            'user_id',
            'displayName email'
        );
    },

    /**
     * Lấy các Task theo trạng thái.
     * @param {string} status - Trạng thái ('todo', 'in_progress', 'done').
     * @returns {Promise<Task[]>}
     */
    getTaskByStatus: async (status) => {
        try {
            // invalidId(status, 'Invalid status'); // Sử dụng nếu đã import
            return Task.find({ status: status })
        } catch (error) {
            throw error;
        }
    },

    /**
     * Tạo một Task mới.
     * @param {object} taskData - Dữ liệu Task.
     * @returns {Promise<Task>}
     */
    createTask: async (taskData) => {
        const task = new Task(taskData);
        return await task.save();
    },

    /**
     * Cập nhật Task theo ID.
     * @param {string} id - ID của Task.
     * @param {object} taskData - Dữ liệu cần cập nhật.
     * @returns {Promise<Task | null>}
     */
    updateTask: async (id, taskData) => {
        return Task.findByIdAndUpdate(id, taskData, { new: true, runValidators: true });
    },

    /**
     * Xóa mềm (soft delete) Task theo ID.
     * @param {string} id - ID của Task.
     * @returns {Promise<Task | null>}
     */
    deleteTask: async (id) => {
        // soft delete
        return Task.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    }
};

// Sử dụng Default Export để chỉ xuất object service duy nhất
export default taskService;