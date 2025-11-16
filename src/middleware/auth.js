const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header) return res.status(401).json({ success: false, message: 'No token' });

    const token = header.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-passwordHash');
    if (!user) return res.status(401).json({ success: false, message: 'Usuario no encontrado' });

    req.user = user;
    next();
  } catch (err) {
    console.error('auth error', err);
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
};

module.exports = { authMiddleware };
