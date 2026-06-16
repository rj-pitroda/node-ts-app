import { AppError } from "../../shared/appError.ts";
import { UserRepository } from "../user/user.repository.ts";
import { TLoginSchema, TSignUpSchema } from "./auth.schema.ts";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { ERROR_MESSAGES } from "../../shared/constants/error.ts";
import { StatusCodes } from "http-status-codes";
import { ENV_VAR } from "../../utils/helper.ts";
import { ObjectLiteral } from "typeorm";
import { getForgotPasswordTemplate } from "../../templates/forgotPassword.template.ts";
import { EmailService } from "../email/email.service.ts";
import { RoleRepository } from "../role/role.repository.ts";
import { USER_ROLE } from "../../shared/enum/enum.ts";
import formidable from "formidable";
import { CloudinaryService } from "../cloudinary/cloudinary.service.ts";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private roleRepository: RoleRepository,
    private cloudinaryService: CloudinaryService
  ) {}

  signUp = async (
    data: TSignUpSchema,
    files: formidable.File[]
  ): Promise<boolean> => {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      throw new AppError(
        ERROR_MESSAGES.USER_ALREADY_EXISTS_BY_EMAIL,
        StatusCodes.CONFLICT
      );
    }

    const result = await this.cloudinaryService.uploadImage(
      files[0].filepath,
      "userImages",
      files[0].originalFilename
    );

    const userRole = await this.roleRepository.findByName(USER_ROLE.USER);

    const hashedPassword = await this.bcryptPassword(data.password);

    await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      roleId: userRole.id,
      imageUrl: result.secure_url,
      imgPublicId: result.public_id,
    });

    return true;
  };

  login = async (data: TLoginSchema) => {
    const user = await this.userRepository.findByEmailWithPassword(data.email);
    if (!user) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        StatusCodes.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        StatusCodes.UNAUTHORIZED
      );
    }

    const userWithoutPassword = {
      ...user,
      password: undefined,
      role: user.role.name,
    };

    const accessToken = this.generateAccessToken(userWithoutPassword);

    const refreshToken = this.generateRefreshToken(userWithoutPassword);

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  };

  refreshAccessToken = async (refreshToken: string) => {
    try {
      const decoded = jwt.verify(
        refreshToken,
        ENV_VAR.JWT_REFRESH_SECRET
      ) as ObjectLiteral;

      const user = await this.userRepository.findByEmailOrFail(decoded.email);

      const userWithoutPassword = { ...user, password: undefined };

      const newAccessToken = this.generateAccessToken(userWithoutPassword);

      return {
        user: userWithoutPassword,
        accessToken: newAccessToken,
      };
    } catch {
      throw new AppError(ERROR_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }
  };

  forgotPassword = async (email: string): Promise<boolean> => {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError(
        ERROR_MESSAGES.USER_NOT_FOUND_BY_EMAIL,
        StatusCodes.NOT_FOUND
      );
    }

    const resetToken = this.generateResetPasswordToken({ email: user.email });
    const resetLink = `${ENV_VAR.FRONTEND_URL}/reset-password/${resetToken}`;

    const htmlContent = getForgotPasswordTemplate(
      user.name,
      user.email,
      resetLink
    );

    await this.emailService.sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: htmlContent,
    });

    return true;
  };

  resetPassword = async (
    token: string,
    newPassword: string
  ): Promise<boolean> => {
    let email: string;
    try {
      const decoded = jwt.verify(
        token,
        ENV_VAR.JWT_RESET_SECRET
      ) as ObjectLiteral;
      email = decoded.email;
    } catch {
      throw new AppError(
        ERROR_MESSAGES.INVALID_RESET_TOKEN,
        StatusCodes.BAD_REQUEST
      );
    }

    const user = await this.userRepository.findByEmailOrFail(email);
    const hashedPassword = await this.bcryptPassword(newPassword);

    await this.userRepository.update(user.id, {
      password: hashedPassword,
    });

    return true;
  };

  private generateAccessToken = (payload: object) => {
    return jwt.sign(payload, ENV_VAR.JWT_ACCESS_SECRET, {
      expiresIn: ENV_VAR.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
    });
  };

  private generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, ENV_VAR.JWT_REFRESH_SECRET, {
      expiresIn: ENV_VAR.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
    });
  };

  private generateResetPasswordToken = (payload: object) => {
    return jwt.sign(payload, ENV_VAR.JWT_RESET_SECRET, {
      expiresIn: ENV_VAR.JWT_RESET_EXPIRES_IN as SignOptions["expiresIn"],
    });
  };

  private bcryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };
}
