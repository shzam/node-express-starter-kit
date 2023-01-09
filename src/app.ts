import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

// module
import { corsUrl, environment } from './config';
import Logger from 'core/Logger';
import {} from 'core/'

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);
app.use(morgan('tiny'))
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

process.on('uncaughtException', (e) => {
    Logger.error(e);
});
  
// Routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

export default app;