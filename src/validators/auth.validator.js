
const { z } = require("zod");

const RegisterSchema = z.object({
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").max(30, "El nombre de usuario no puede exceder 30 caracteres"),
    email: z.string().email("El email debe ser válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(100, "La contraseña no puede exceder 100 caracteres")
});

const LoginSchema = z.object({
    email: z.string().email("El email debe ser válido"),
    password: z.string().min(1, "La contraseña es obligatoria")
});

module.exports = {
    RegisterSchema,
    LoginSchema
};

