const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomCode: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Rooms', roomSchema);
