import { NextFunction, Request, Response } from "express";

/**
 * Handles a 404 error by setting the response status to 404 and
 * passing the error to the next middleware in the stack.
 *
 * This middleware is typically used to catch any URLs that don't
 * match any of the routes defined in the application.
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function in the middleware stack.
 * @throws {Error} The error message is "Not Found - <req.originalUrl>".
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Handles errors by setting the response status to the error's status code
 * (or 500 if the status code is 200), and sending a JSON response with the
 * error message and stack trace (unless the application is in production, in
 * which case the stack trace is not sent).
 *
 * This middleware should be placed last in the middleware stack, so that it
 * can catch any errors that are not caught by other middleware.
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function in the middleware stack.
 * @param {Error} err - The error object.
 */
export const errorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  err: Error
): void => {
  // Set the status code to the error's status code, or 500 if the status code is 200
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Send a JSON response with the error message and stack trace
  // Unless the application is in production, in which case the stack trace is not sent
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
