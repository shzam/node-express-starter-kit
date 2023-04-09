import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import Mongostore from 'connect-mongo';
import mongoose from 'mongoose';
// modules
import { corsUrl, environment } from '@config';
import Logger from '@core/Logger';
import {
    NotFoundError,
    ApiError,
    InternalError,
    ErrorType
} from '@core/ApiError';
import routes from '@apps/index';
import passport from '@helpers/passport';
import '@database';

const app = express();
const sessionStore = Mongostore.create({
    client: mongoose.connection.getClient(),
    collectionName: 'session'
});

app.use(express.json({ limit: '10mb' }));
app.use(
    express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
);

app.use(morgan('tiny'));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

process.on('uncaughtException', (e) => {
    Logger.error(e);
});

// Routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
