import { Router } from "express";
import { UserController } from "./user.controller.ts";
import { UserService } from "./user.service.ts";
import { UserRepository } from "./user.repository.ts";
import { User } from "../../entities/user.entity.ts";

const userRouter = Router();

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getById);

export default userRouter;
