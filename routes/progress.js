const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress');

router.post('/', progressController.addToProgress); 
router.get('/', progressController.index);

module.exports = router;
