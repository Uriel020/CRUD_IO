import HttpError from "./HttpError";
import { ErrorCode } from "../types/error-code";
import { Response } from "express";

export function handleHttpError(res: Response, error: unknown) {
  const code =
    error instanceof HttpError ? error.code : ErrorCode.InternalServerError;
  const message = error instanceof HttpError ? error.message : "Unknown error";
  return res.status(code).json(message);
}
