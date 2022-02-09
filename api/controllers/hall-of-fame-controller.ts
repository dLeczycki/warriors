import { Request, Response } from "express";

export function getBestWarriors(req: Request, res: Response) {
  res.send('Get all hall of fame results - 10 best warriors with highest number of battles won');
}