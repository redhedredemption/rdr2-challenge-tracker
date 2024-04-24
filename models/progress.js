const mongoose = require('mongoose');
const { challenges } = require('../data');
const user = require('./user');
const Schema = mongoose.Schema;

const challengeStatusSchema = new mongoose.Schema({
    status: { type: String, enum: ['Incomplete', 'In Progress', 'Complete'], default: 'Incomplete' },
    challenge: { type: Schema.Types.ObjectId, ref: 'Challenge'},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
});
const progressSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    challenges: [challengeStatusSchema]
});

module.exports = mongoose.model('Progress', progressSchema);

