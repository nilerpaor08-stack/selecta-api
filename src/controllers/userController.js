const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ success:false, message:'Faltan campos' });

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ success:false, message:'Usuario o email ya existe' });

    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, email, passwordHash });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Error del servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success:false, message:'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ success:false, message:'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success:true, token, user: { id:user._id, username:user.username, email:user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Error del servidor' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const id = req.params.id || req.user?._id;
    const user = await User.findById(id).select('-passwordHash');
    if (!user) return res.status(404).json({ success:false, message:'Usuario no encontrado' });
    res.json({ success:true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Error del servidor' });
  }
};
