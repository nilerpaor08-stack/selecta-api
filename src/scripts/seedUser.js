require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/database');

(async () => {
  try {
    await connectDB();
    const existing = await User.findOne({ email: 'admin@selecta.com' });
    if (existing) {
      console.log('Usuario de prueba ya existe:');
      console.log(existing);
      process.exit(0);
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
    const passwordHash = await bcrypt.hash('123456', saltRounds);
    const user = new User({
      username: 'admin',
      email: 'admin@selecta.com',
      passwordHash,
      bio: 'Usuario administrador de prueba'
    });
    await user.save();
    console.log('✅ Usuario de prueba creado con éxito:');
    console.log('Email: admin@selecta.com');
    console.log('Contraseña: 123456');
    process.exit(0);
  } catch (err) {
    console.error('Error creando usuario de prueba:', err);
    process.exit(1);
  }
})();
