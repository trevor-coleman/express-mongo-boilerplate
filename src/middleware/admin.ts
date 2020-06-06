import { Request, Response, NextFunction } from 'express';
import { AuthorizedRequest } from './auth';
import debug from 'debug';

const log = debug('app:middleware:admin')


const admin = (req: AuthorizedRequest, res:Response, next: NextFunction)=> {
    if(!req.user!.isAdmin) return res.status(403).send('Access denied.');

    next()
}

export default admin;