import { Request, Response } from "express";

export interface ISystemControllerPort {
  healthcheck(req: Request, res: Response): void;
}
