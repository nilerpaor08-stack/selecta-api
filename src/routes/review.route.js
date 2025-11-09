const { Router } = require('express');
const ReviewRouter = Router();
const { addReview, getReviewsForGame } = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/auth');

ReviewRouter.post('/', authMiddleware, addReview);
ReviewRouter.get('/:gameId', getReviewsForGame);

module.exports = {
    ReviewRouter
};
