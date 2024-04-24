const Challenge = require('../models/challenge');

// Render form for creating a new challenge
exports.getNewChallengeForm = (req, res) => {
    res.render('challenges/new');
};

// Render form for editing an existing challenge
exports.getEditChallengeForm = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.render('challenges/edit', { challenge });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all challenges and render the index view with the challenges data
exports.getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.render('challenges/index', { challenges });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a challenge by ID and render the show view with the challenge data
exports.getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.render('challenges/show', { challenge });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Process form submission for creating a new challenge
exports.createChallenge = async (req, res) => {
    const challenge = new Challenge({
        title: req.body.title,
        category: req.body.category,
        tasks: req.body.tasks,
    });

    try {
        const newChallenge = await challenge.save();
        res.redirect(`/challenges/${newChallenge._id}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Process form submission for updating an existing challenge
exports.updateChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        challenge.title = req.body.title;
        challenge.category = req.body.category;
        challenge.tasks = req.body.tasks;

        const updatedChallenge = await challenge.save();
        res.redirect(`/challenges/${updatedChallenge._id}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Process form submission for deleting a challenge
exports.deleteChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        await challenge.remove();
        res.redirect('/challenges');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
