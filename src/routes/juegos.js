const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// ✅ Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
});

// ✅ Agregar un nuevo juego
router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Game(req.body);
    const juegoGuardado = await nuevoJuego.save();
    res.status(201).json(juegoGuardado);
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar el juego' });
  }
});

// ✅ Eliminar un juego
router.delete('/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Juego eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar el juego' });
  }
});

module.exports = router;
