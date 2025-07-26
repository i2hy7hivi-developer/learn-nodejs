const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Manager'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
