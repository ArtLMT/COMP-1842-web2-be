const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    description: { type: String, required: true }
});

module.exports = mongoose.model('Status', statusSchema);
