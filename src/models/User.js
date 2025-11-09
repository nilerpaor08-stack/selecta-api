const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('User', userSchema);
