const Challenge = require('../models/challenge');

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
        let query = {};
        const filter = req.query.filter; // Access the filter query parameter from the URL

        if (filter && filter !== 'all') {
            query.category = filter; // Add a category filter to the query if not 'all'
        }

        const challenges = await Challenge.find(query); // Fetch challenges from the database based on the query
        res.render('challenges/index', { challenges }); // Render the page with the filtered challenges
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
