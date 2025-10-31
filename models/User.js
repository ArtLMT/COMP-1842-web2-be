const mongoose = require('mongoose');
require('./Role');


const userSchema = new mongoose.Schema({
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    date_of_birth: { type: Date },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
