import express from "express";
import { ENV_VAR } from "./utils/helper.ts";
import { AppDataSource } from "./config/db.ts";
import appRouter from "./routes/index.ts";
import { globalErrorMiddleware } from "./middlewares/globalError.middleware.ts";

const app = express();

app.use(appRouter);

// put this at the end
app.use(globalErrorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(ENV_VAR.PORT, () => {
      console.log(
        `Server running on port ${ENV_VAR.PORT}, http://localhost:${ENV_VAR.PORT}/`
      );
    });
  })
  .catch((error) => {
    console.log("DB Error:", error);
  });
