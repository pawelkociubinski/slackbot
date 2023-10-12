import { DTO } from "../../domain/ports/dto.js";
import { HealthcheckResponse } from "../../domain/ports/index.js";
import { config } from "../../infrastructure/config.js";
import { Whatever } from "../../types.js";

export class HealthcheckDTO implements DTO, HealthcheckResponse {
  success = true;
  version = config.npm_package_version;
  status: string;

  constructor(status: string) {
    this.status = status;
  }
}

interface ILog {
  payload: Record<string, Whatever>;
}

export class LogDTO implements DTO, ILog {
  success = true;
  version = config.npm_package_version;
  payload: ILog["payload"];

  constructor(payload: ILog["payload"]) {
    this.payload = payload;
  }
}
