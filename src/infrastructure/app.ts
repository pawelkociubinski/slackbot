import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./error.js";
import { httpLogger } from "./config.js";
import { IDependencies, IServerPort } from "../domain/ports/Server.js";
import { asyncHandler } from "../helpers/index.js";

/**
 * HttpServerAdapter adapter is a singleton.
 * There is no reason to create more instances of this object.
 */
export class HttpServerAdapter implements IServerPort {
  static instance: HttpServerAdapter;
  private configured: boolean = false;
  httpServer: IServerPort["httpServer"];

  private constructor() {
    this.httpServer = express();
  }

  configure(dependencies: IDependencies) {
    const {
      slackController,
      systemController,
      validateSlackMessageMiddleware,
    } = dependencies;

    if (this.configured) {
      throw new Error("HttpServer has already been configured!");
    }

    this.httpServer.use(cors({ origin: "*" }));
    this.httpServer.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.httpServer.use(bodyParser.json());
    this.httpServer.use(httpLogger);

    this.httpServer.get("/api/healthcheck", systemController.healthcheck);
    this.httpServer.post(
      "/api/slack/event-subscription",
      validateSlackMessageMiddleware,
      asyncHandler(slackController.reactToMessageOnChannel)
    );

    this.httpServer.use(errorHandler);
    this.configured = true;

    return this.httpServer;
  }

  static getInstance() {
    if (!HttpServerAdapter.instance) {
      this.instance = new HttpServerAdapter();
    }

    return this.instance;
  }
}
