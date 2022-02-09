import { Request, Response, Router } from "express";

export const warriorRouter = Router();

warriorRouter.get('/', (req: Request, res: Response) => {
  res.send('Get all warriors');
})

warriorRouter.get('/:name', (req: Request, res: Response) => {
  res.send('Get single warrior')
})

warriorRouter.post('/', (req: Request, res: Response) => {
  res.send('insert single warrior');
})