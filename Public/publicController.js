const User = require('../Models/userModel');
const Candidate = require('../Models/candidateModel');

exports.getProfile = async (req, res) => {
    try {
        const { apiToken } = req.body;
        const user = await User.findOne({ apiToken });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCandidates = async (req, res) => {
    try {
        const { apiToken } = req.body;
        const user = await User.findOne({ apiToken });
        if (user) {
            const candidates = await Candidate.find({ user_id: user._id });
            res.status(200).json(candidates);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
