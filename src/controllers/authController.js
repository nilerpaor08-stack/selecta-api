const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { RegisterSchema, LoginSchema } = require('../validators/auth.validator');

const register = async (req, res, next) => {
    try {
        const data = RegisterSchema.parse(req.body);

        const emailExists = await User.findOne({ email: data.email });
        if (emailExists)
            return res
                .status(400)
                .json({ success: false, message: "Email ya existe" });

        const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
        const passwordHash = await bcrypt.hash(data.password, saltRounds);

        const user = new User({ username: data.username, email: data.email, passwordHash });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const data = LoginSchema.parse(req.body);

        const user = await User.findOne({ email: data.email });
        if (!user) return res.status(400).json({ success: false, message: 'Credenciales inválidas' });

        const ok = await bcrypt.compare(data.password, user.passwordHash);
        if (!ok) return res.status(400).json({ success: false, message: 'Credenciales inválidas' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error(err);
        next(err);
    }
};


module.exports = {
    register,
    login,
};