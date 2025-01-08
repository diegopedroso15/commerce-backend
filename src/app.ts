import express from "express";
import cors from "cors";
import { appRoutes } from "./routes/index.routes";

const app = express();

app.use(cors());
app.use(express.json());

appRoutes(app);

export default app;