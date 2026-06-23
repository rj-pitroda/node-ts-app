import { NextFunction, Request, Response } from "express";
import formidable from "formidable";

const maxFileSizeInMB = 10;
const maxTotalFileSizeInMB = 50;
export const formidableMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.is("multipart/form-data")) {
    return next();
  }

  try {
    const form = formidable({
      keepExtensions: true,
      maxFileSize: maxFileSizeInMB * 1024 * 1024,
      maxTotalFileSize: maxTotalFileSizeInMB * 1024 * 1024,
    });

    const [fields, files] = await form.parse(req);

    const body = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [
        key,
        Array.isArray(value) ? value[0] : value,
      ])
    );
    req.body = body;
    req.files = files;

    next();
  } catch (err: any) {
    if (err.code === 1016) {
      return next(new Error(`File size must not exceed ${maxFileSizeInMB}MB`));
    }

    if (err.code === 1009) {
      return next(
        new Error(`Total upload size must not exceed ${maxTotalFileSizeInMB}MB`)
      );
    }

    next(err);
  }
};
