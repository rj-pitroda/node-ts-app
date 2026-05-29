import { Request, Response } from "express";
import { BaseService } from "./base.service.ts";
import { TBaseEntity } from "./base.dto.ts";

export class BaseController<T extends TBaseEntity> {
  constructor(private service: BaseService<T>) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();

    return res.status(200).json({
      success: true,
      data: result,
    });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.getByIdOrThrow(Number(id));

    return res.status(200).json({
      success: true,
      data: result,
    });
  };
}
