import {
  DeepPartial,
  EntityTarget,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { AppDataSource } from "../../config/db.ts";
import { ERROR_MESSAGES } from "../../shared/constants/error.ts";
import { TBaseEntity } from "./base.dto.ts";
import { AppError } from "../../shared/appError.ts";
import { StatusCodes } from "http-status-codes";

export class BaseRepository<T extends TBaseEntity> {
  private repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(entity);
  }

  create = async (data: DeepPartial<T>): Promise<T> => {
    const entity = this.repository.create(data);

    return await this.repository.save(entity);
  };

  getAll = async (): Promise<T[]> => {
    return await this.repository.find();
  };

  getById = async (id: T["id"]): Promise<T | null> => {
    return await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  };

  getByIdOrThrow = async (id: T["id"]): Promise<T> => {
    const exRecord = await this.getById(id);

    if (!exRecord) {
      throw new AppError(
        ERROR_MESSAGES.RECORD_ID_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }

    return exRecord;
  };

  update = async (id: T["id"], data: DeepPartial<T>): Promise<T["id"]> => {
    const exRecord = await this.getByIdOrThrow(id);

    Object.assign(exRecord, data);

    await this.repository.save(exRecord);

    return id;
  };

  delete = async (id: T["id"]): Promise<T> => {
    const exRecord = await this.getByIdOrThrow(id);
    return await this.repository.remove(exRecord);
  };
}
