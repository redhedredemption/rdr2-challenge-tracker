const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: String,
    category: String,
    tasks: [String],
    progress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProgress'
    }]
});

module.exports = mongoose.model('Challenge', challengeSchema);
