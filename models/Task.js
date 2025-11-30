import mongoose from "mongoose";
import User from "./User.js";
// require('./Status');

const taskSchema = new mongoose.Schema({
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['todo', 'in_progress', 'done'],
        default: 'todo',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: { type: String },
    dueDate: { type: Date },
    isDeleted: {
        type: Boolean,
        default: false }
}, { timestamps: true });

// module.exports = mongoose.model('Task', taskSchema);
// console.log( typeof taskSchema, 'Keys:', Object.keys(taskSchema));

export default mongoose.model('Task', taskSchema);
