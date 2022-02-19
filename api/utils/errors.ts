import { NextFunction, Request, Response } from "express";

export class ValidationError extends Error { }

export function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: 'We are working on it. Try again later!' });
}

export function handleNotFound(req: Request, res: Response) {
  return res.status(404).json({ message: 'Resource not found!' });
}