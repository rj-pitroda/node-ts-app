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
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware.ts";

const userRouter = Router();

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/", authenticateMiddleware, userController.getAll);
userRouter.get(
  "/:id",
  authenticateMiddleware,
  validate(numericIdSchema),
  userController.getById
);
userRouter.post(
  "/",
  authenticateMiddleware,
  validate(createUserSchema),
  userController.create
);
userRouter.put(
  "/:id",
  authenticateMiddleware,
  validate(updateUserSchema),
  userController.update
);
userRouter.delete(
  "/:id",
  authenticateMiddleware,
  validate(numericIdSchema),
  userController.delete
);

export default userRouter;
