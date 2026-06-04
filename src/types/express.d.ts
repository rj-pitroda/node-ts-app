import { TUserRequest } from "./common.type.ts";

declare global {
  namespace Express {
    interface Request {
      user?: TUserRequest;
    }
  }
}

export {};
