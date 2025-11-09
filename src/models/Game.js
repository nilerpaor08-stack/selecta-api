const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  rating: { type: Number, default: 0 },
  fechaLanzamiento: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
