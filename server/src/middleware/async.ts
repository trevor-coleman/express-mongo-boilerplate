import { Request, Response, NextFunction } from 'express';
import debug from 'debug';

const log = debug('app:middleware:async')


const asyncMiddleware = (handler: (req: Request, res: Response) => any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res);
        } catch (e) {
            next(e);
        }
    };
}


export default asyncMiddleware;