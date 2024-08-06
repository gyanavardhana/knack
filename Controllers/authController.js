const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateSalt = async () => {
    return await bcrypt.genSalt(10);
};

const hashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

const createToken = (userId, secret, expiresIn = '1h') => {
    return jwt.sign({ userId }, secret, { expiresIn });
};

const generateApiToken = () => {
    return crypto.randomBytes(30).toString('hex');
};

exports.signup = async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);
        const apiToken = generateApiToken();
        const user = new User({
            email,
            password: hashedPassword,
            salt,
            first_name,
            last_name,
            apiToken
        });
        await user.save();
        res.status(201).json({ message: 'User Created', apiToken });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            const token = createToken(user._id, process.env.JWT_SECRET);
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
