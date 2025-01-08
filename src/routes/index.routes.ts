import { Express } from "express";
import cors from "cors";
import mailRoutes from "./mail.routes";
import loginRoutes from "./login.routes";

export const appRoutes = (app: Express) => {
  app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

  app.use("/api/v1/mail", mailRoutes);

  app.use("/api/v1/login", loginRoutes);

};
