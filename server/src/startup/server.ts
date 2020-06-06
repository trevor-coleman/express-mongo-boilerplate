import express from 'express';
import installMiddleware from './middleware';
import createRoutes from './create-routes';
import startViewEngine from './views';
import verifyConfig from './config';
import connectDb from './database';
import prod from './prod';


const createServer = () => {

    const app = express();
    verifyConfig();
    connectDb();
    installMiddleware(app);
    createRoutes(app);
    startViewEngine(app);
    prod(app);

    return app
}

export default createServer;