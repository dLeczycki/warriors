import * as express from "express";
import { homeRouter } from './routes/home-route';
import { warriorRouter } from './routes/warrior-route';
import { arenaRouter } from './routes/arena-route';
import { hallOfFameRouter } from './routes/hall-of-fame-route';

const app = express();

app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);

app.listen(3000, () => console.log('listening on port 3000'));