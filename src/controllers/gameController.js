const Game = require('../models/Game');
const { CreateGameSchema, GetGameByIdSchema } = require('../validators/game.validator');

const getGames = async (req, res, next) => {
  try {
    const games = await Game.find().sort({ title: 1 });
    res.json(games);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getGame = async (req, res, next) => {
  try {
    const data = GetGameByIdSchema.parse(req.params);
    const game = await Game.findById(data.id);
    if (!game) {
      throw new Error("Juego no encontrado");
    }
    res.json(game);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createGame = async (req, res, next) => {
  try {
    const data = CreateGameSchema.parse(req.body);
    await Game.create(data);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const data = GetGameByIdSchema.parse(req.params);
    const game = await Game.findByIdAndDelete(data.id);
    if (!game) {
      throw new Error("Juego no encontrado");
    }
    res.status(200).json({ message: "Juego eliminado" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  createGame,
  getGames,
  getGame,
  deleteGame
};