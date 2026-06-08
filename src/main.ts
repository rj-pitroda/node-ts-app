import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV_VAR } from "./utils/helper.ts";
import { AppDataSource } from "./config/db.ts";
import appRouter from "./routes/index.ts";
import { globalErrorMiddleware } from "./middlewares/globalError.middleware.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api", appRouter);

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
