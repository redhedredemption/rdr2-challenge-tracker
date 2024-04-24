const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//     description: String,
//     isCompleted: { type: Boolean, default: false }
// });

const challengeSchema = new mongoose.Schema({
    name: { type: String, /*required: true*/ },
    category: { type: String, required: true },
    steps: { type: String, required: false },
    /* UPDATE STEPS FORMAT */
    // progress: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'UserProgress'
    // }],
    status: { type: String, enum: ['Incomplete', 'In Progress', 'Complete'], default: 'Incomplete' }
});

module.exports = mongoose.model('Challenge', challengeSchema);
