import { NextFunction, Request, Response } from "express";

export const GENERAL_ERROR = Symbol.for("GENERAL_ERROR");
export const SOME_ERROR = Symbol.for("SOME_ERROR");
export const VALIDATION_ERROR = Symbol.for("VALIDATION_ERROR");
export const WRONG_URL = Symbol.for("WRONG_URL");

const ErrorCode = {
  [GENERAL_ERROR]: 404,
  [SOME_ERROR]: 400,
  [VALIDATION_ERROR]: 400,
  [WRONG_URL]: 400,
} as const;
type ErrorCode = keyof typeof ErrorCode;

const ErrorType = {
  [GENERAL_ERROR]: GENERAL_ERROR,
  [SOME_ERROR]: SOME_ERROR,
  [VALIDATION_ERROR]: VALIDATION_ERROR,
  [WRONG_URL]: WRONG_URL,
} as const;

type ErrorTypes = keyof typeof ErrorType;

interface IError {
  message: string;
  type: ErrorTypes;
}

export class SystemError extends Error {
  type: ErrorTypes;

  constructor(error: IError) {
    super(error.message);

    // https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, SystemError.prototype);

    this.type = error.type;
  }
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof SystemError) {
    res.status(ErrorCode[error.type]).send(error.message);
  } else {
    res.status(ErrorCode[GENERAL_ERROR]).send("General Error");
  }
}
