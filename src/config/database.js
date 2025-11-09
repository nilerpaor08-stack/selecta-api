const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI no está definido en .env');

    await mongoose.connect(uri);
    console.log('MongoDB conectado: ✅', mongoose.connection.name);
  } catch (err) {
    console.error('Error conectando a MongoDB:❌', err.message);
    throw err;
  }
};

module.exports = connectDB;
