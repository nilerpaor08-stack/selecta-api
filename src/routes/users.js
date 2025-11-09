const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', authMiddleware, (req, res) => res.json({ success:true, user: req.user }));
router.get('/:id', authMiddleware, userController.getUserProfile);

module.exports = router;
