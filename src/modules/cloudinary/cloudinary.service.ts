import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../config/cloudinary.ts";
import { AppError } from "../../shared/appError.ts";
import { ERROR_MESSAGES } from "../../shared/constants/error.ts";
import { StatusCodes } from "http-status-codes";

import path from "path";

import dayjs from "dayjs";

export class CloudinaryService {
  uploadImage = async (
    filePath: string,
    folder: string,
    originalFilename?: string | null
  ): Promise<UploadApiResponse> => {
    try {
      const options: any = {
        folder,
        resource_type: "image",
      };

      if (originalFilename) {
        const extension = path.extname(originalFilename);
        const baseName = path.basename(originalFilename, extension);
        const timestamp = dayjs().format("DDMMYYYY-HHmmss");
        options.public_id = `${baseName}-${timestamp}`;
      }

      const result = await cloudinary.uploader.upload(filePath, options);
      return result;
    } catch {
      throw new AppError(
        ERROR_MESSAGES.CLOUDINARY.UPLOAD_FAILED,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  deleteImage = async (publicId: string): Promise<any> => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch {
      throw new AppError(
        ERROR_MESSAGES.CLOUDINARY.DELETE_FAILED,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
}
