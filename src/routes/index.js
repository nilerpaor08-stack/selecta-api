const { Router } = require('express');
const { AuthRouter } = require('./auth.route');
const { GameRouter } = require('./game.route');
const { ReviewRouter } = require('./review.route');
// const { UserRouter } = require('./user.route');
const router = Router();

router.use('/auth', AuthRouter);
router.use('/games', GameRouter);
// router.use('/user', UserRouter);
router.use('/reviews', ReviewRouter);
module.exports = router;