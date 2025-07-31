import {HttpCode} from '../types/httpCode';

class HttpError extends Error {
  public readonly code: HttpCode;
  public readonly message: string;

  constructor(code: HttpCode, message: string) {
    super(message);
    this.code = code;
    this.message = message;

    this.name = this.constructor.name; // Override default error name with HttpError
  }
}

export default HttpError;
