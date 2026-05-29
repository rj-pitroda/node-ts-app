import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES } from "../shared/constants/error.ts";
import { AppError } from "../shared/appError.ts";
import { TApiResponse } from "../types/common.type.ts";
import { sendErrorResponse } from "../shared/sendResponse.ts";

export const globalErrorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction // If you miss next, Express may NOT treat it as an error handler properly.Express error middleware MUST have 4 parameters
) => {
  const errorResponse: TApiResponse = {
    isSuccess: false,
    message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err instanceof AppError) {
    errorResponse.data = err.data;
  }

  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
  }

  console.error("🔥 Error:", errorResponse);

  return sendErrorResponse(res, errorResponse);
};
