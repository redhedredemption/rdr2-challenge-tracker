const Challenge = require('../models/challenge');

// Controller functions for CRUD operations

exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createChallenge = async (req, res) => {
  const challenge = new Challenge({
    title: req.body.title,
    category: req.body.category,
    tasks: req.body.tasks,
    // Progress field is not set here as it depends on user progress
  });

  try {
    const newChallenge = await challenge.save();
    res.status(201).json(newChallenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    challenge.title = req.body.title || challenge.title;
    challenge.category = req.body.category || challenge.category;
    challenge.tasks = req.body.tasks || challenge.tasks;

    const updatedChallenge = await challenge.save();
    res.json(updatedChallenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    await challenge.remove();
    res.json({ message: 'Challenge deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
