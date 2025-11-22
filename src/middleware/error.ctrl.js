const { z } = require('zod');

const errorHandler = (err, req, res, next) => {
    if (err instanceof z.ZodError) {
        // Devuelve un formato legible de los errores de validación
        const errors = err.errors.map(e => ({ path: e.path, message: e.message }));
        console.log('Zod validation error:', errors);
        return res.status(400).json({ success: false, errors });
    }

    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: err?.message ?? 'Error en la aplicación',
        trace: process.env.NODE_ENV === 'production' ? undefined : (err?.stack ?? JSON.stringify(err)),
    });
};

module.exports = errorHandler;
