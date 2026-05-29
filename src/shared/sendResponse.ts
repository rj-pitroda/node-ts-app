import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TApiResponse } from "../types/common.type.ts";
import { ERROR_MESSAGES } from "../constants/error.ts";

const sendResponse = <T>(res: Response, response: TApiResponse<T>) => {
  return res.status(response.statusCode).json(response);
};

export const sendSuccessResponse = <T>(
  res: Response,
  {
    message,
    statusCode = StatusCodes.OK,
    data,
  }: Partial<Omit<TApiResponse<T>, "stack">>
) => {
  return sendResponse(res, {
    isSuccess: true,
    message,
    statusCode,
    data,
  });
};

export const sendErrorResponse = <T>(
  res: Response,
  {
    message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    data,
    stack,
  }: TApiResponse<T>
) => {
  return sendResponse(res, {
    isSuccess: false,
    message,
    statusCode,
    data,
    stack,
  });
};
