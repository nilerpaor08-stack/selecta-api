const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // TODO: Validate data with Zod guiarse del gameController y error.ctrl.js
    if (!username || !email || !password) return res.status(400).json({ success: false, message: 'Faltan campos' });

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res
        .status(400)
        .json({ success: false, message: "Email ya existe" });

    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, email, passwordHash });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ success: false, message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const id = req.params.id || req.user?._id;
    const user = await User.findById(id).select('-passwordHash');
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};

module.exports = {
  register,
  login,
  getUserProfile
};