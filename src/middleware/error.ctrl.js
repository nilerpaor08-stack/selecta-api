const { z } = require("zod");
const errorHandler = (err, req, res, next) => {
    if (err instanceof z.ZodError) {
        console.log('error-------->', err.message);
        return res.status(400)
            .json({ error: JSON.parse(err.message) });
    }
    res.status(500).send({
        message: err?.message ?? 'Error con peticion',
        trace: err?.message ?? err?.stack ?? JSON.stringify(err)
    });
};

module.exports = errorHandler;
