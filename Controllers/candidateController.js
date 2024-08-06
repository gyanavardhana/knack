const Candidate = require('../Models/candidateModel');
const jwt = require('jsonwebtoken');

exports.addCandidate = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { first_name, last_name, email } = req.body;
        const candidate = new Candidate({
            first_name,
            last_name,
            email,
            user_id: decoded.userId,
        });
        await candidate.save();
        res.status(201).json({ message: 'Candidate added' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCandidates = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const candidates = await Candidate.find({ user_id: decoded.userId });
        res.status(200).json(candidates);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
