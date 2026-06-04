import { Router } from "express";
import userRouter from "../modules/user/user.route.ts";
import authRouter from "../modules/auth/auth.route.ts";
import { sendErrorResponse } from "../shared/sendResponse.ts";
import { ERROR_MESSAGES } from "../shared/constants/error.ts";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.ts";

const appRouter = Router();

// auth router
appRouter.use("/auth", authRouter);

//Auth middleware - to protect routes after this middleware
appRouter.use(authenticateMiddleware);

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
