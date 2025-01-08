import app from "./app";
import { AppDataSource } from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err: any) => {
    console.error("Error during Data Source start", err);
  });
  app.listen(process.env.PORT || 3030, () => console.log("Server running " + process.env.PORT));
})();
