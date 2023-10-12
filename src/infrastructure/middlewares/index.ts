import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { SystemError, VALIDATION_ERROR } from "../error.js";
import { githubPullRequestUrlRegex } from "../../constants/index.js";

export const gitHubMessage = z
  .object({
    event: z
      .object({
        message: z
          .object({
            text: z.string().regex(githubPullRequestUrlRegex),
          })
          .and(z.unknown()),
      })
      .and(z.unknown()),
  })
  .and(z.unknown());

export function validateSlackMessageMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    gitHubMessage.parse(req.query.body);

    next();
  } catch (error) {
    throw new SystemError({
      type: VALIDATION_ERROR,
      message: "Bad request: incorrect parameters",
    });
  }
}
