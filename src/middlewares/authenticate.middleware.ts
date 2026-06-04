import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { AppError } from "../shared/appError.ts";
import { ERROR_MESSAGES } from "../shared/constants/error.ts";
import { TUserRequest } from "../types/common.type.ts";

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let accessToken: string | undefined;

  accessToken = req.cookies?.accessToken;

  if (!accessToken && req.headers.authorization?.startsWith("Bearer ")) {
    accessToken = req.headers.authorization.split(" ")[1];
  }

  if (!accessToken) {
    throw new AppError(ERROR_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }

  try {
    const decodedToken = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as TUserRequest;

    req.user = decodedToken;

    next();
  } catch {
    throw new AppError(ERROR_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }
};
