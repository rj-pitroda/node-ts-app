import { Router } from "express";
import { AuthController } from "./auth.controller.ts";
import { AuthService } from "./auth.service.ts";
import { UserRepository } from "../user/user.repository.ts";
import { User } from "../../entities/user.entity.ts";
import { validate } from "../../middlewares/validate.middleware.ts";
import { loginSchema, signUpSchema } from "./auth.schema.ts";

const authRouter = Router();

const userRepository = new UserRepository(User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post("/signup", validate(signUpSchema), authController.signUp);
authRouter.post("/login", validate(loginSchema), authController.login);

export default authRouter;
