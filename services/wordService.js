import Word from '../models/Word.js';
// import { invalidId } from '../utils/errorUtils.js';

const wordService = {
    getAllTasks: async () => {
        try {
            return await Word.find({ isDeleted: false })
                .populate(
                    'user_id',
                    'displayName email'
                );
        } catch (err) {
            console.error('Error fetching all tasks:', err);
            throw err;
        }
    },

    getTaskById: async (id) => {
        return Word.findOne({
            _id: id,
            isDeleted: false
        }).populate(
            'user_id',
            'displayName email'
        );
    },

    createTask: async (taskData) => {
        const newWord = new Word(taskData);
        return await newWord.save();
    },

    updateTask: async (id, taskData) => {
        return Word.findByIdAndUpdate(id, taskData, { new: true, runValidators: true });
    },

    deleteTask: async (id) => {
        // return Word.findByIdAndDelete(id);

        return Word.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    }
};

export default wordService;