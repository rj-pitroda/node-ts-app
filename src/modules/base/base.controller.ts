import { Request, Response } from "express";
import { ObjectLiteral } from "typeorm";
import { BaseService } from "./base.service.ts";

export class BaseController<T extends ObjectLiteral> {
  constructor(private service: BaseService<T>) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();

    return res.status(200).json({
      success: true,
      data: result,
    });
  };
}
