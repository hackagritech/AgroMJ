import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import { onErrorServer } from './helpers/handlers';
import routes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(onErrorServer);
app.use('/', routes);

export default app;
