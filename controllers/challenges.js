const Challenge = require('../models/challenge');
const Progress = require('../models/progress');

// Render form for creating a new challenge
exports.getNewChallengeForm = async (req, res) => {
    const challenges = await Challenge.find();
    res.render('challenges/new', {challenges});
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
        // Fetch progress data from the database or wherever it's stored
        const progress = await Progress.findOne({ user: req.user._id });

        // Fetch challenges data from the database or wherever it's stored
        const challenges = await Challenge.find();

        // Render the view and pass both progress and challenges data
        res.render('challenges/index', { progress, challenges });
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).send("Failed to retrieve challenges.");
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
        name: req.body.name,
        category: req.body.category,
        steps: req.body.steps,
        status: req.body.status
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
        // Update challenge properties with data from the form
        challenge.name = req.body.name;
        challenge.category = req.body.category;
        challenge.steps = req.body.steps;
        challenge.status = req.body.status;

        // Save the updated challenge to the database
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
