import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
import { sendErrorResponse } from "../shared/sendResponse.ts";
import { ERROR_MESSAGES } from "../shared/constants/error.ts";

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    return sendErrorResponse(res, {
      message: ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
      statusCode: StatusCodes.TOO_MANY_REQUESTS,
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});
