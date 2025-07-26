import {ErrorCode} from '../types/error-code';

class HttpError extends Error {
  public readonly code: ErrorCode;
  public readonly message: string;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
    this.message = message;

    this.name = this.constructor.name; // Override default error name with HttpError
  }
}

export default HttpError;
