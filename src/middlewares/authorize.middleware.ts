import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../shared/appError.ts";
import { USER_ROLE } from "../shared/enum/enum.ts";
import { ERROR_MESSAGES } from "../shared/constants/error.ts";

export const authorizeMiddleware = (allowedRoles: USER_ROLE | USER_ROLE[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new AppError(ERROR_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    const rolesArray = Array.isArray(allowedRoles)
      ? allowedRoles
      : [allowedRoles];
    console.log("user", user, rolesArray, rolesArray.includes(user.role));
    if (!rolesArray.includes(user.role)) {
      throw new AppError(ERROR_MESSAGES.FORBIDDEN, StatusCodes.FORBIDDEN);
    }

    next();
  };
};
