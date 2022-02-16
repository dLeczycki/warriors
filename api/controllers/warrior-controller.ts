import { Request, Response } from "express";

import { WarriorModel } from "../models/warrior-model";
import { ValidationError } from "../utils/errors";
import { uploadWarriorImages } from "../utils/helpers";


export async function getWarriors(req: Request, res: Response) {
  const warriors = await WarriorModel.getAll();
  res.json(warriors);
}

export async function getWarrior(req: Request, res: Response) {
  const { name } = req.params;
  const warrior = await WarriorModel.getOne(name);

  if (warrior === null) throw new ValidationError('Warrior not found');

  res.json(warrior);
}

export async function insertWarrior(req: Request, res: Response) {
  const { portraitImage, attackImage } = req.files as any;
  const { name, strength, defense, agility, resilience } = JSON.parse(req.body.warrior);

  if (!portraitImage || !attackImage) throw new ValidationError('You must specify a portrait image and a attack image');

  //TODO: poprawna walidacja wojownika - dodać walidację pustego imienia i samych białych znaków
  if (name.length === 0 || /^\s*$/.test(name)) throw new ValidationError('Name cannot be empty');

  if (await WarriorModel.warriorExists(name)) {
    throw new ValidationError('Warrior already exists');
  }

  if (strength + defense + agility + resilience !== 10) {
    throw new ValidationError('You must spend exactly 10 points for warrior skills')
  }

  if (strength < 1 || defense < 1 || agility < 1 || resilience < 1) {
    throw new ValidationError('You must spend at least 1 point for each warrior skill');
  }

  const { portraitImagePath, attackImagePath } = uploadWarriorImages(name, portraitImage, attackImage);
  const warrior = new WarriorModel(name, strength, defense, agility, resilience, 0, portraitImagePath, attackImagePath);

  const insertedWarrior = await warrior.insert();

  res.json(insertedWarrior);
}