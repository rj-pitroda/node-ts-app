import { z } from "zod";
import formidable from "formidable";
import { ERROR_MESSAGES } from "../shared/constants/error.ts";

interface FileValidationOptions {
  maxSizeInBytes?: number;
  allowedMimeTypes?: string[];
  maxFileNameLength?: number;
  required?: boolean;
}

export const createFileSchema = (options: FileValidationOptions = {}) => {
  const {
    maxSizeInBytes = 2 * 1024 * 1024, // 2MB default
    allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"],
    maxFileNameLength = 228, // 255 - 27 (folder + suffix overhead)
    required = true,
  } = options;

  return z.any().superRefine((file, ctx) => {
    const fileObj = Array.isArray(file) ? file[0] : file;

    if (!fileObj || !(fileObj as formidable.File).filepath) {
      if (required) {
        ctx.addIssue({
          code: "custom",
          message: ERROR_MESSAGES.FILE.REQUIRED,
        });
      }
      return;
    }

    // 1. Size Validation
    if ((fileObj as formidable.File).size > maxSizeInBytes) {
      ctx.addIssue({
        code: "custom",
        message: ERROR_MESSAGES.FILE.LIMIT_SIZE,
      });
    }

    // 2. Mime Type Validation
    if (
      !allowedMimeTypes.includes((fileObj as formidable.File).mimetype || "")
    ) {
      ctx.addIssue({
        code: "custom",
        message: ERROR_MESSAGES.FILE.INVALID_TYPE,
      });
    }

    // 3. Filename Length Validation
    const filename = (fileObj as formidable.File).originalFilename || "";
    if (filename) {
      const extensionLength =
        filename.lastIndexOf(".") !== -1
          ? filename.length - filename.lastIndexOf(".")
          : 0;
      const baseNameLength = filename.length - extensionLength;
      if (baseNameLength > maxFileNameLength) {
        ctx.addIssue({
          code: "custom",
          message: ERROR_MESSAGES.FILE.LIMIT_NAME,
        });
      }
    }
  });
};
