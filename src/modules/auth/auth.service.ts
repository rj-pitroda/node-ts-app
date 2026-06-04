import { AppError } from "../../shared/appError.ts";
import { UserRepository } from "../user/user.repository.ts";
import { TLoginSchema, TSignUpSchema } from "./auth.schema.ts";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { ERROR_MESSAGES } from "../../shared/constants/error.ts";
import { StatusCodes } from "http-status-codes";
import { ENV_VAR } from "../../utils/helper.ts";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signUp = async (data: TSignUpSchema): Promise<boolean> => {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      throw new AppError(
        ERROR_MESSAGES.USER_ALREADY_EXISTS_BY_EMAIL,
        StatusCodes.CONFLICT
      );
    }
    const hashedPassword = await this.bcryptPassword(data.password);

    await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return true;
  };

  login = async (data: TLoginSchema) => {
    const user = await this.userRepository.findByEmailOrFail(data.email);
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        StatusCodes.UNAUTHORIZED
      );
    }

    const userWithoutPassword = { ...user, password: undefined };

    const accessToken = this.createJwtToken(
      userWithoutPassword,
      ENV_VAR.JWT_ACCESS_SECRET,
      ENV_VAR.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"]
    );

    const refreshToken = this.createJwtToken(
      userWithoutPassword,
      ENV_VAR.JWT_REFRESH_SECRET,
      ENV_VAR.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]
    );

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  };

  private bcryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  private createJwtToken = (
    payload: object,
    secret: string,
    expiresIn: SignOptions["expiresIn"]
  ) => {
    return jwt.sign(payload, secret, { expiresIn });
  };
}
