import express from "express";
import { ENV_VAR } from "./utils/helper.ts";

const app = express();

app.use("/", (req, res) => {
  return res.send("Welcome to Nodejs project");
});

app.listen(ENV_VAR.PORT, () => {
  console.log(`Server running on port ${ENV_VAR.PORT}`);
});
