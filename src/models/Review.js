const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: { type: Number, min: 0, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Review', reviewSchema);
