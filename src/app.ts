import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// module
import { corsUrl, environment } from './config';
import Logger from './core/Logger';
import {
    NotFoundError,
    ApiError,
    InternalError,
    ErrorType
} from './core/ApiError';
import routes from './routes';

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(
    express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
);
app.use(morgan('tiny'));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

process.on('uncaughtException', (e) => {
    Logger.error(e);
});

// Routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

app.use((req, res, next) => next(new NotFoundError()));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
        if (err.type === ErrorType.INTERNAL)
            Logger.error(
                `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
            );
    } else {
        Logger.error(
            `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        Logger.error(err);
        if (environment === 'development') {
            return res.status(500).send(err);
        }
        ApiError.handle(new InternalError(), res);
    }
});
export default app;
