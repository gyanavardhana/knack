require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./DB/db');


const app = express();
app.use(bodyParser.json());

const authRoutes = require('./Routes/authRoutes');
const candidateRoutes = require('./Routes/candidateRoutes');
const publicApiRoutes = require('./Public/publicRoutes');

app.use('/api', authRoutes);
app.use('/api', candidateRoutes);
app.use('/api', publicApiRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
