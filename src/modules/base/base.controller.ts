import { Request, Response } from "express";
import { BaseService } from "./base.service.ts";
import { TBaseEntity } from "./base.dto.ts";
import { sendSuccessResponse } from "../../shared/sendResponse.ts";
import { MSG } from "../../shared/constants/messages.ts";

export class BaseController<T extends TBaseEntity> {
  constructor(private service: BaseService<T>) {}

  create = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await this.service.create(data);

    return sendSuccessResponse(res, {
      data: result,
      message: MSG.RECORD_CREATE_SUCCESS,
    });
  };

  getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();

    return sendSuccessResponse(res, { data: result });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.getByIdOrThrow(Number(id));

    return sendSuccessResponse(res, { data: result });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await this.service.update(Number(id), data);

    return sendSuccessResponse(res, {
      data: result,
      message: MSG.RECORD_UPDATE_SUCCESS,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.delete(Number(id));

    return sendSuccessResponse(res, {
      data: result,
      message: MSG.RECORD_DELETE_SUCCESS,
    });
  };
}
