// src/controllers/gameControllerFull.js
const Game = require('../models/Game');

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ title: 1 });
    res.json({ success: true, games });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Error obteniendo juegos' });
  }
};

exports.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ success:false, message:'Juego no encontrado' });
    res.json({ success:true, game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Error obteniendo juego' });
  }
};

exports.createGame = async (req, res) => {
  try {
    const { title, description, price, image, genre, releaseDate } = req.body;
    const game = new Game({ title, description, price, image, genre, releaseDate });
    await game.save();
    res.status(201).json({ success:true, game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Error creando juego' });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ success:false, message:'Juego no encontrado' });
    res.json({ success:true, message:'Juego eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Error eliminando juego' });
  }
};
