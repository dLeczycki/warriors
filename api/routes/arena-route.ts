import { Request, Response, Router } from "express";

export const arenaRouter = Router();

arenaRouter.post('/', (req: Request, res: Response) => {
  res.send('return array of moves and result');
})