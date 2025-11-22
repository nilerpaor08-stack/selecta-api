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

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET no está definido en las variables de entorno');
            return res.status(500).json({ success: false, message: 'Error interno: JWT_SECRET no definido' });
        }

    const token = jwt.sign({ id: user._id }, jwtSecret);
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

        const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
        if (!isPasswordValid) return res.status(400).json({ success: false, message: 'Credenciales inválidas' });

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET no está definido en las variables de entorno');
            return res.status(500).json({ success: false, message: 'Error interno: JWT_SECRET no definido' });
        }

        const token = jwt.sign({ id: user._id }, jwtSecret);
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