import { Router } from "express";
import { AuthController } from "./auth.controller.ts";
import { AuthService } from "./auth.service.ts";
import { UserRepository } from "../user/user.repository.ts";
import { User } from "../../entities/user.entity.ts";
import { validate } from "../../middlewares/validate.middleware.ts";
import {
  loginSchema,
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.schema.ts";
import { EmailService } from "../email/email.service.ts";
import { loginRateLimiter } from "../../middlewares/rateLimit.middleware.ts";
import { RoleRepository } from "../role/role.repository.ts";
import { CloudinaryService } from "../cloudinary/cloudinary.service.ts";

const authRouter = Router();

const userRepository = new UserRepository(User);
const roleRepository = new RoleRepository();
const emailService = new EmailService();
const cloudinaryService = new CloudinaryService();
const authService = new AuthService(
  userRepository,
  emailService,
  roleRepository,
  cloudinaryService
);
const authController = new AuthController(authService);

authRouter.post("/register", validate(signUpSchema), authController.signUp);
authRouter.post(
  "/login",
  loginRateLimiter,
  validate(loginSchema),
  authController.login
);
authRouter.post("/refreshAccessToken", authController.refreshAccessToken);
authRouter.post("/logout", authController.logout);
authRouter.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword
);
authRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword
);

export default authRouter;
