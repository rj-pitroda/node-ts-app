import { Role } from "../../entities/role.entity.ts";
import { BaseRepository } from "../base/base.repository.ts";
import { USER_ROLE } from "../../shared/enum/enum.ts";
import { AppError } from "../../shared/appError.ts";
import { ERROR_MESSAGES } from "../../shared/constants/error.ts";

export class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(Role);
  }

  findByName = async (name: USER_ROLE): Promise<Role> => {
    const result = await this.repository.findOne({
      where: { name },
    });

    if (!result) throw new AppError(ERROR_MESSAGES.ROLE_NOT_FOUND);

    return result;
  };
}
