import HttpError from "./HttpError";
import { HttpCode } from "../types/httpCode";
import { Response } from "express";

function handleHttpError(res: Response, error: unknown) {
  const code =
    error instanceof HttpError ? error.code : HttpCode.InternalServerError;
  const message = error instanceof HttpError ? error.message : "Unknown error";
  return res.status(code).json(message);
}

export { handleHttpError };
