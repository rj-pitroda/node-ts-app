import { Router } from "express";
import userRouter from "../modules/user/user.route.ts";
import { sendErrorResponse } from "../shared/sendResponse.ts";
import { ERROR_MESSAGES } from "../shared/constants/error.ts";

const appRouter = Router();

// user router
appRouter.use("/user", userRouter);

// 404 route
appRouter.use("/", (req, res) => {
  return sendErrorResponse(res, {
    message: ERROR_MESSAGES.API_ENDPOINT_NOT_FOUND,
    statusCode: 404,
  });
});

export default appRouter;
