const { Router } = require('express');
const GameRouter = Router();
const { createGame, getGames, getGame, deleteGame } = require("../controllers/gameController");

// ✅ Obtener todos los juegos
GameRouter.get('/', getGames);

// ✅ Obtener un juego por ID
GameRouter.get('/:id', getGame);

// ✅ Agregar un nuevo juego
GameRouter.post("/", createGame);

// ✅ Eliminar un juego
GameRouter.delete('/:id', deleteGame);

module.exports = {
    GameRouter
};
