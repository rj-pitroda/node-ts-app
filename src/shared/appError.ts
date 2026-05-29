export class AppError<T = unknown> extends Error {
  constructor(
    public message: string,
    public statusCode = 500,
    public data?: T
  ) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}
