import { NextFunction, Request, Response } from "express";
import formidable from "formidable";

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
  } catch (err) {
    next(err);
  }
};
