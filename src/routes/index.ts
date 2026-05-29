import { Router } from "express";
import userRouter from "../modules/user/user.route.ts";

const appRouter = Router();

// user router
appRouter.use("/user", userRouter);

appRouter.use("/", (req, res) => {
  return res.send("Welcome to Nodejs project");
});

export default appRouter;
