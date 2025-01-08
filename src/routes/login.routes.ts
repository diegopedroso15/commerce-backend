import { Router } from "express";
import { loginController } from "../controllers/login/loginController";
import { authMiddleware } from "../middlewares/auth/authMiddleware";

const loginRoutes = Router();

loginRoutes.post(
    '/token',
);

loginRoutes.post(
    '/register',
);

loginRoutes.post(
    '/login',
    loginController,
);

export default loginRoutes;
