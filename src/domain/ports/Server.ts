import { Express, Request, Response, NextFunction } from "express";
import { ISlackControllerPort } from "./SlackController.js";
import { ISystemControllerPort } from "./SystemController.js";

export interface IDependencies {
  slackController: ISlackControllerPort;
  systemController: ISystemControllerPort;
  validateSlackMessageMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void;
}

export interface IServerPort {
  httpServer: Express; // It should be more generic type
  configure: (dependencies: IDependencies) => IServerPort["httpServer"];
}
