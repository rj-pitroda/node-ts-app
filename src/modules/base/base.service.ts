import { DeepPartial } from "typeorm";
import { BaseRepository } from "./base.repository.ts";
import { TBaseEntity } from "./base.dto.ts";

export class BaseService<T extends TBaseEntity> {
  constructor(private repo: BaseRepository<T>) {}

  create = async (data: DeepPartial<T>): Promise<T> => {
    return await this.repo.create(data);
  };

  getAll = async (): Promise<T[]> => {
    return await this.repo.getAll();
  };

  getById = async (id: T["id"]): Promise<T | null> => {
    return await this.repo.getById(id);
  };

  getByIdOrThrow = async (id: T["id"]): Promise<T> => {
    return await this.repo.getByIdOrThrow(id);
  };

  update = async (id: T["id"], data: DeepPartial<T>): Promise<T["id"]> => {
    return await this.repo.update(id, data);
  };

  delete = async (id: T["id"]): Promise<T> => {
    return await this.repo.delete(id);
  };
}
