const mongoose = require('mongoose');
require('./User');
require('./Status');

const taskSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
