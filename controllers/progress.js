const Progress = require('../models/progress');
const Challenge = require('../models/challenge');
const { challenges } = require('../data');

module.exports = {
    addToProgress,
    index,
};

async function addToProgress(req, res) {
    console.log(req.body)
    let progress = await Progress.findOne({user: req.user._id})
    //If there has been no progress so far, this will create a progress file for them
    if (!progress){
        progress = await Progress.create({
            user: req.user._id,
            challenges: []
        })
        await progress.save()
    }
    let challengeProgress = await Progress.findOne({user: req.user._id, 'challenges.challenge': {_id: req.body.name}})
    if (challengeProgress) return res.redirect('/challenges/new')
    let challengeStatus = {
        challenge: req.body.name,
        status: req.body.status,
        user: req.user._id,
        }
    progress.challenges.push(challengeStatus) //pushing challenge to progress challenges array
    await progress.save()
    res.redirect(`/progress`)
};

async function index(req, res) {
    try {
        const progress = await Progress.findOne({ user: req.user._id }).populate('challenges.challenge');
        res.render('progress/index', { progress });
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).send('Failed to retrieve progress.');
    }
}
