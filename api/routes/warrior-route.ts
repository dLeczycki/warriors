import { Router } from "express";
import { getWarrior, getWarriors, insertWarrior } from "../controllers/warrior-controller";

export const warriorRouter = Router();

warriorRouter.get('/', getWarriors);
warriorRouter.get('/:name', getWarrior);
warriorRouter.post('/', insertWarrior);