const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    ownerId: {
        type: ObjectId,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Post', postSchema);
