const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { gameId, rating, comment } = req.body;
    const review = new Review({ game: gameId, user: req.user._id, rating, comment });
    await review.save();
    res.json({ success:true, review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Error creando reseña' });
  }
};

exports.getReviewsForGame = async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const reviews = await Review.find({ game: gameId }).populate('user', 'username');
    res.json({ success:true, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Error listando reseñas' });
  }
};
