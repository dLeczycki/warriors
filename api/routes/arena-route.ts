import { Router } from "express";
import { fight } from "../controllers/arena-controller";

export const arenaRouter = Router();

arenaRouter.post('/', fight);