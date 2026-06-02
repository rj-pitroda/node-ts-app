import { Router } from "express";
import { UserController } from "./user.controller.ts";
import { UserService } from "./user.service.ts";
import { UserRepository } from "./user.repository.ts";
import { User } from "../../entities/user.entity.ts";
import { validate } from "../../middlewares/validate.middleware.ts";
import {
  createUserSchema,
  updateUserSchema,
  numericIdSchema,
} from "./user.schema.ts";

const userRouter = Router();

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/", userController.getAll);
userRouter.get("/:id", validate(numericIdSchema), userController.getById);
userRouter.post("/", validate(createUserSchema), userController.create);
userRouter.put("/:id", validate(updateUserSchema), userController.update);
userRouter.delete("/:id", validate(numericIdSchema), userController.delete);

export default userRouter;
