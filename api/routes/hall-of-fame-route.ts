import { Request, Response, Router } from "express";

export const hallOfFameRouter = Router();

hallOfFameRouter.get('/', (req: Request, res: Response) => {
  res.send('Get all hall of fame results');
})