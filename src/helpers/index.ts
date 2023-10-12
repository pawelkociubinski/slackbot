import { NextFunction, Request, Response } from "express";
import { githubPullRequestUrlRegex } from "../constants/index.js";

export function isGitPullRequestURL(url: string) {
  return githubPullRequestUrlRegex.test(url);
}

export function getPullRequestNumberFromSentence(sentence: string) {
  const result = sentence.match(/([^\/]+)\/pull\/(\d+)$/);
  return result?.[2]!;
}

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await fn(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
}
