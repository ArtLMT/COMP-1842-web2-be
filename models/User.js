const mongoose = require('mongoose');
require('./Role');

const userSchema = new mongoose.Schema({
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    date_of_birth: { type: Date },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// ✅ Only compile if it doesn't already exist
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
