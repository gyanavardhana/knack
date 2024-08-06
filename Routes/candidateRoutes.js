const express = require('express');
const { addCandidate, getCandidates } = require('../Controllers/candidateController');

const router = express.Router();

router.post('/candidate', addCandidate);
router.get('/candidate', getCandidates);

module.exports = router;
