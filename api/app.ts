import * as express from "express";
require('express-async-errors');
import * as fileUpload from "express-fileupload";
import * as cors from "cors";
import { join } from "path";

import { warriorRouter } from './routes/warrior-route';
import { arenaRouter } from './routes/arena-route';
import { hallOfFameRouter } from './routes/hall-of-fame-route';
import { handleError, handleNotFound } from "./utils/errors";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(join(__dirname, 'public')));
app.use(fileUpload());
app.use(cors());

app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);

app.use(handleError);
app.use(handleNotFound);

app.listen(3001, () => console.log('listening on port 3001'));