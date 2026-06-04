import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodObject } from "zod";
import { AppError } from "../shared/appError.ts";

export const validate = (schema: ZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errorDetails = result.error.issues.map((err) => ({
        field:
          err.path.length > 1
            ? err.path.slice(1).join(".")
            : err.path.join("."),
        message: err.message,
      }));
      const formattedMessage = `Validation failed: ${errorDetails.map((d) => `'${d.field}': ${d.message}`).join(", ")}`;
      throw new AppError(
        formattedMessage,
        StatusCodes.BAD_REQUEST,
        errorDetails
      );
    }

    // Replace req properties with sanitized and parsed values
    const parsedData = result.data as any;
    req.body = parsedData?.body;
    req.params = parsedData?.params;

    if (parsedData?.query) {
      Object.defineProperty(req, "query", {
        value: parsedData.query,
        writable: true,
        configurable: true,
      });
    }

    next();
  };
};
