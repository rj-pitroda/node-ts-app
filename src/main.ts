import express from "express";
import { ENV_VAR } from "./utils/helper.ts";
import { AppDataSource } from "./config/db.ts";

const app = express();

app.use("/", (req, res) => {
  return res.send("Welcome to Nodejs project");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(ENV_VAR.PORT, () => {
      console.log(`Server running on port ${ENV_VAR.PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB Error:", error);
  });
