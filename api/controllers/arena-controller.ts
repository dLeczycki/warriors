import { Request, Response } from "express";

export function startFight(req: Request, res: Response) {
  res.send('Battle log');
}