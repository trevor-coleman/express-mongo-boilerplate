import { NextFunction, Request, Response } from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import { environment } from '../config/config';
import { IUser } from '../models/User';

const log = debug('app:middleware:auth');

export type AuthorizedRequest = Request & {
    user?: IUser
}

const auth = (req: Request & {user?:IUser}, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied. No token provided');
    }

    try {
        const payload = jwt.verify(token, environment.jwtSecret) as IUser;
        req.user = payload;
    } catch (e) {
        return res.status(400).send('Invalid token');
    }

    next();
};

export default auth;