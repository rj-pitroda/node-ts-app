import { StatusCodes } from "http-status-codes";
import { User } from "../../entities/user.entity.ts";
import { AppError } from "../../shared/appError.ts";
import { BaseRepository } from "../base/base.repository.ts";
import { ERROR_MESSAGES } from "../../shared/constants/error.ts";
import { CloudinaryService } from "../cloudinary/cloudinary.service.ts";

export class UserRepository extends BaseRepository<User> {
  private cloudinaryService = new CloudinaryService();

  override getAll = async (): Promise<(User & { roleName?: string })[]> => {
    const users = await this.repository.find({
      relations: { role: true },
    });

    return users.map((user) => ({
      ...user,
      roleName: user.role?.name,
    }));
  };

  override delete = async (id: number): Promise<number> => {
    const user = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        imgPublicId: true,
      },
    });

    if (!user) {
      throw new AppError(
        ERROR_MESSAGES.RECORD_ID_NOT_FOUND,
        StatusCodes.BAD_REQUEST
      );
    }

    if (user.imgPublicId) {
      await this.cloudinaryService.deleteImage(user.imgPublicId);
    }

    await this.repository.remove(user);
    return id;
  };

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
        imageUrl: true,
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
