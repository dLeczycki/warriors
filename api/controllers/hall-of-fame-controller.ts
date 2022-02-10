import { Request, Response } from "express";
import { WarriorModel } from "../models/warrior-model";

export async function getBestWarriors(req: Request, res: Response) {
  const bestWarriors: WarriorModel[] = await WarriorModel.getBestWarriors();
  res.json(bestWarriors);
}