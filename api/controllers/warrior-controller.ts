import { Request, Response } from "express";

import { WarriorModel } from "../models/warrior-model";
import { ValidationError } from "../utils/errors";
import { uploadWarriorImages } from "../utils/helpers";
import { WarriorToInsert } from '../../types/warrior';


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
  const warriorToInsert: WarriorToInsert = JSON.parse(req.body.warrior);

  if (warriorToInsert.name.length === 0 || /^\s*$/.test(warriorToInsert.name)) throw new ValidationError('Name cannot be empty');

  if (await WarriorModel.warriorExists(warriorToInsert.name)) {
    throw new ValidationError('Warrior already exists');
  }

  if (warriorToInsert.strength + warriorToInsert.defense + warriorToInsert.agility + warriorToInsert.resilience !== 10) {
    throw new ValidationError('You must spend exactly 10 points for warrior skills')
  }

  if (warriorToInsert.strength < 1 || warriorToInsert.defense < 1 || warriorToInsert.agility < 1 || warriorToInsert.resilience < 1) {
    throw new ValidationError('You must spend at least 1 point for each warrior skill');
  }

  let portraitImagePath = "public/bandit-portrait-image.png", attackImagePath = "public/bandit-attack-image.png";
  try {
    const { portraitImage, attackImage } = req.files as any;
    const uploadResult = uploadWarriorImages(warriorToInsert.name, portraitImage, attackImage);
    portraitImagePath = uploadResult.portraitImagePath;
    attackImagePath = uploadResult.attackImagePath;
  } catch (error) { }

  const warrior = new WarriorModel(warriorToInsert.name, warriorToInsert.strength, warriorToInsert.defense, warriorToInsert.agility, warriorToInsert.resilience, 0, portraitImagePath, attackImagePath);

  const insertedWarrior = await warrior.insert();

  res.json(insertedWarrior);
}