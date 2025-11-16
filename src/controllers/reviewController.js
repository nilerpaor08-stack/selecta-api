const Game = require('../models/Game');
const Review = require('../models/Review');
const { AddReviewSchema, GetReviewsByGameIdSchema } = require('../validators/review.validator');

const addReview = async (req, res, next) => {
  try {
    const data = AddReviewSchema.parse(req.body);
    const review = await Review.create({ ...data, game: data.gameId, user: req.user._id });
    res.status(201).json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

const getReviewsForGame = async (req, res, next) => {
  try {
    const { gameId } = GetReviewsByGameIdSchema.parse(req.params);
    const game = await Game.findById(gameId);
    if (!game) {
      throw new Error('Juego no encontrado');
    }
    const reviews = await Review.find({ game: gameId }).populate('user', 'username');
    res.json({ reviews, game });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  addReview,
  getReviewsForGame
};
