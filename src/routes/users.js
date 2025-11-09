const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

router.get('/me', authMiddleware, (req, res) => res.json({ success: true, user: req.user }));
router.get('/:id', authMiddleware, getUserProfile);

module.exports = router;
