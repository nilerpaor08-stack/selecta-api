
const { z } = require("zod");
const { Types } = require("mongoose");

const CreateGameSchema = z.object({
    title: z.string().min(1, "El título es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    price: z.number().min(0, "El precio debe ser un número positivo"),
    image: z.string(),
    category: z.string().min(1, "El género es obligatorio"),
    releaseDate: z.string().min(1, "La fecha de lanzamiento es obligatoria"),
});

const GetGameByIdSchema = z.object({
    id: z.string().min(1, "El ID es obligatorio").refine(id => Types.ObjectId.isValid(id), { message: "ID inválido" }),
});


module.exports = {
    CreateGameSchema,
    GetGameByIdSchema
};