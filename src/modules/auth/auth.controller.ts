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

    this.setCustomCookie(
      res,
      "accessToken",
      accessToken,
      ENV_VAR.JWT_ACCESS_EXPIRES_IN
    );

    this.setCustomCookie(
      res,
      "refreshToken",
      refreshToken,
      ENV_VAR.JWT_REFRESH_EXPIRES_IN
    );

    return sendSuccessResponse(res, {
      data: user,
      message: MSG.AUTH.USER_LOGGED_IN_SUCCESS,
    });
  };

  refreshAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    const newAccessToken =
      await this.authService.refreshAccessToken(refreshToken);

    this.setCustomCookie(
      res,
      "accessToken",
      newAccessToken.accessToken,
      ENV_VAR.JWT_ACCESS_EXPIRES_IN
    );

    return sendSuccessResponse(res, {
      message: MSG.AUTH.ACCESS_TOKEN_REFRESHED,
    });
  };
  cookieOptions = {
    httpOnly: true,
    secure: ENV_VAR.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
  };

  logout = async (req: Request, res: Response) => {
    res.clearCookie("accessToken", this.cookieOptions);
    res.clearCookie("refreshToken", this.cookieOptions);

    return sendSuccessResponse(res, {
      message: MSG.AUTH.USER_LOGGED_OUT_SUCCESS,
    });
  };

  forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    await this.authService.forgotPassword(email);

    return sendSuccessResponse(res, {
      message: MSG.AUTH.PASSWORD_RESET_EMAIL_SENT,
    });
  };

  resetPassword = async (req: Request, res: Response) => {
    const { token, password } = req.body;
    await this.authService.resetPassword(token, password);

    return sendSuccessResponse(res, {
      message: MSG.AUTH.PASSWORD_RESET_SUCCESS,
    });
  };

  private setCustomCookie = (
    res: Response,
    key: string,
    value: string,
    duration: string
  ) => {
    res.cookie(key, value, {
      ...this.cookieOptions,
      maxAge: parseDurationToMs(duration),
    });
  };
}
