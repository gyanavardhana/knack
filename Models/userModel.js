const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  password: String,
  salt: String,
  apiToken: { type: String, unique: true }
});

module.exports = mongoose.model('User', userSchema);
