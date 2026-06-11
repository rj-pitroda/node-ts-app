import { StatusCodes } from "http-status-codes";
import { User } from "../../entities/user.entity.ts";
import { AppError } from "../../shared/appError.ts";
import { BaseRepository } from "../base/base.repository.ts";
import { ERROR_MESSAGES } from "../../shared/constants/error.ts";

export class UserRepository extends BaseRepository<User> {
  findByEmail = async (email: string) => {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  };

  findByEmailWithPassword = async (email: string) => {
    const user = await this.repository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: {
          name: true,
        },
      },
      relations: { role: true },
    });

    return user;
  };

  findByEmailOrFail = async (email: string) => {
    const user = await this.repository.findOne({
      where: { email },
    });
    if (!user) {
      throw new AppError(
        ERROR_MESSAGES.USER_NOT_FOUND_BY_EMAIL,
        StatusCodes.NOT_FOUND
      );
    }
    return user;
  };
}
