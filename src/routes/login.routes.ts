import { Router } from "express";
import { loginController } from "../controllers/loginControllers/loginController";
import { loginSchema, registerSchema, tokenSchema } from "../schemas/loginSchemas";
import { validateSchema } from "../middlewares/validateSchema/validateSchema";
import { registerController } from "../controllers/loginControllers/registerController";
import { validateEmailToken } from "../middlewares/validadeEmailToken/validateEmailToken";
import { sendEmailTokenController } from "../controllers/loginControllers/sendEmailTokenController";

const loginRoutes = Router();

loginRoutes.post(
    '/token',
    validateSchema(tokenSchema),
    sendEmailTokenController,
);

loginRoutes.post(
    '/register',
    validateSchema(registerSchema),
    validateEmailToken,
    registerController,
);

loginRoutes.post(
    '/',
    validateSchema(loginSchema),
    loginController,
);

export default loginRoutes;
