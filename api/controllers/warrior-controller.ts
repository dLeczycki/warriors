import { Request, Response } from "express";

export function getWarriors(req: Request, res: Response) {
  res.send('Get all warriors');
}

export function getWarrior(req: Request, res: Response) {
  res.send('Get single warrior');
}

export function insertWarrior(req: Request, res: Response) {
  res.send('insert single warrior');
}