const Progress = require('../models/progress');
const Challenge = require('../models/challenge');

module.exports = {
    getNewChallengeForm,
    getChallengeById,
    getEditChallengeForm,
    deleteItem,
    update,
};

async function getNewChallengeForm(req, res) {
    const challenges = await Challenge.find();
    res.render('challenges/new', {challenges});
};

async function getEditChallengeForm(req, res) {
    const challenges = await Challenge.find();
    try {
        const progress = await Progress.findOne({ 'challenges._id': req.params.id }).populate('challenges.challenge');
        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }
        const challenge = progress.challenges.id(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.render('challenges/edit', { challenge, challenges });
    } catch (error) {
        console.error('Error fetching challenge:', error);
        res.status(500).send('Failed to retrieve challenge.');
    }
}




async function deleteItem(req, res) {
    console.log(req.params.id)
    const progress = await Progress.findOne({'challenges._id': req.params.id, 'challenges.user': req.user._id});
    if(!progress) return res.redirect(`/progress`);
    progress.challenges.remove(req.params.id);
    await progress.save();
    res.redirect(`/progress`);
}

async function update(req, res) {
    console.log(req.params.id)
    // Note the cool "dot" syntax to query on the property of a subdoc
    const progress = await Progress.findOne({'challenges._id': req.params.id});
    console.log(progress)
    // Find the challenge subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const challengeSubdoc = progress.challenges.id(req.params.id);
    // Ensure that the challenge was created by the logged in user
    if (!challengeSubdoc.user.equals(req.user._id)) return res.redirect(`/progresss`);
    // Update the text of the challenge
    challengeSubdoc.status = req.body.status;
    try {
      await progress.save();
    } catch (e) {
      console.log(e.message);
    }
    // Redirect back to the progress's show view
    res.redirect(`/progress`);
  }

  async function getChallengeById(req, res) {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.render('challenges/show', { challenge }); 
    } catch (error) {
        console.error('Error fetching challenge:', error);
        res.status(500).send('Failed to retrieve challenge.');
    }
}