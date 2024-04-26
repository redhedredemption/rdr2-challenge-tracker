const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challenges');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// router.get('/', challengeController.getAllChallenges); 
// router.post('/', challengeController.createChallenge); 
router.get('/new', ensureLoggedIn, challengeController.getNewChallengeForm);
router.get('/:id', ensureLoggedIn, challengeController.getChallengeById);
router.get('/:id/edit', ensureLoggedIn, challengeController.getEditChallengeForm);
router.delete('/:id', ensureLoggedIn, challengeController.deleteItem);
router.put('/:id', ensureLoggedIn, challengeController.update);

module.exports = router;
