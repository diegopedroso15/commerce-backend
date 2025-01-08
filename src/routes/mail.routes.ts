import { Router } from "express";
import { sendEmailController } from "../controllers/mail/send-email";

const mailRoutes = Router();

    mailRoutes.post(
        '/',
        sendEmailController,
    )

export default mailRoutes;