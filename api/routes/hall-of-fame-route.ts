import { Router } from "express";
import { getBestWarriors } from "../controllers/hall-of-fame-controller";

export const hallOfFameRouter = Router();

hallOfFameRouter.get('/', getBestWarriors)