import mongoose from "mongoose";
import User from "./User.js";
// require('./Status');

const wordSchema = new mongoose.Schema({
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    translations: [
        {
            lang: {type: String, required: true},
            value: {type: String, required: true}
        }
    ],
    description: { type: String },
    isDeleted: {
        type: Boolean,
        default: false }
}, { timestamps: true });

// module.exports = mongoose.model('Word', wordSchema);
// console.log( typeof wordSchema, 'Keys:', Object.keys(wordSchema));

export default mongoose.model('Word', wordSchema);
