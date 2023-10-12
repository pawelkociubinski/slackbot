import { Request, Response } from "express";

export interface ISlackControllerPort {
  reactToMessageOnChannel(req: Request, res: Response): Promise<void>;
}
