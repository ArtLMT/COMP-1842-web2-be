const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    description: { type: String, required: true }
});

module.exports = mongoose.model('Role', roleSchema);
