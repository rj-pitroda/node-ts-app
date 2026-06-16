import formidable from "formidable";
import { TUserRequest } from "./common.type.ts";

declare global {
  namespace Express {
    interface Request {
      user?: TUserRequest;
      files?: formidable.Files<string>;
    }
  }
}

export {};
