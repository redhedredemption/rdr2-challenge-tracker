const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challenges');

router.get('/', challengeController.getAllChallenges); 
router.get('/new', challengeController.getNewChallengeForm);
router.post('/', challengeController.createChallenge); 
router.get('/:id', challengeController.getChallengeById);
router.get('/:id/edit', challengeController.getEditChallengeForm);
router.put('/:id', challengeController.updateChallenge); 
router.delete('/:id', challengeController.deleteChallenge); 

module.exports = router;