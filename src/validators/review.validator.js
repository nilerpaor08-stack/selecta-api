
const { z } = require("zod");
const { Types } = require("mongoose");

const AddReviewSchema = z.object({
    gameId: z.string().min(1, "El ID del juego es obligatorio").refine(id => Types.ObjectId.isValid(id), { message: "ID del juego inválido" }),
    rating: z.number().min(1, "El rating debe ser mínimo 1").max(5, "El rating debe ser máximo 5"),
    comment: z.string().min(1, "El comentario es obligatorio").max(500, "El comentario no puede exceder 500 caracteres")
});

const GetReviewsByGameIdSchema = z.object({
    gameId: z.string().min(1, "El ID del juego es obligatorio").refine(id => Types.ObjectId.isValid(id), { message: "ID del juego inválido" })
});

module.exports = {
    AddReviewSchema,
    GetReviewsByGameIdSchema
};

