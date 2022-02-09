import { Router } from "express";
import { startFight } from "../controllers/arena-controller";

export const arenaRouter = Router();

arenaRouter.post('/', startFight);