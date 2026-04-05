class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguishes between logic errors and bugs
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;