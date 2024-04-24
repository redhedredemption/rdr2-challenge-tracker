const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challenges');

router.get('/', challengeController.getAllChallenges);
router.get('/:id', challengeController.getChallengeById);
router.post('/', challengeController.createChallenge);
router.put('/:id', challengeController.updateChallenge);
router.delete('/:id', challengeController.deleteChallenge);

module.exports = router;