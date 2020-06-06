import helmet from 'helmet';
import morgan from 'morgan';
import { environment } from '../config/config';
import express, { Express } from 'express';

const installMiddleware = (app: Express) => {
    const {nodeEnv} = environment;
    app.use(helmet());
    if (nodeEnv == 'development') {
        app.use(morgan('dev'));
    }
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));
};

export default installMiddleware;