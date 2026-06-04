import { Request, Response } from "express";
import { AuthService } from "./auth.service.ts";
import { sendSuccessResponse } from "../../shared/sendResponse.ts";
import { MSG } from "../../shared/constants/messages.ts";
import { ENV_VAR, parseDurationToMs } from "../../utils/helper.ts";

export class AuthController {
  constructor(private authService: AuthService) {}

  signUp = async (req: Request, res: Response) => {
    const newUser = await this.authService.signUp(req.body);

    return sendSuccessResponse(res, {
      data: newUser,
      message: MSG.AUTH.USER_REGISTERED_SUCCESS,
    });
  };

  login = async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await this.authService.login(
      req.body
    );

    const cookieOptions = {
      httpOnly: true,
      secure: ENV_VAR.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: parseDurationToMs(ENV_VAR.JWT_ACCESS_EXPIRES_IN),
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: parseDurationToMs(ENV_VAR.JWT_REFRESH_EXPIRES_IN),
    });

    return sendSuccessResponse(res, {
      data: user,
      message: MSG.AUTH.USER_LOGGED_IN_SUCCESS,
    });
  };
}
