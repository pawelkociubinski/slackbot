import { Request, Response } from "express";
import { HealthcheckDTO } from "../../application/dto/index.js";
import { ISystemControllerPort } from "../../domain/ports/SystemController.js";

export class SystemControllerAdapter implements ISystemControllerPort {
  healthcheck(_req: Request, res: Response) {
    res.json(new HealthcheckDTO("OK"));
  }
}
