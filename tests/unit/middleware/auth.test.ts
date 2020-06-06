import User, { IUser } from '../../../src/models/User';
import auth from '../../../src/middleware/auth';
import { Request, Response } from 'express';
import shortid = require('shortid');

describe('auth middleware', ()=>{
    it('should populate req.user with a valid JWT', ()=>{
        const user = {_id: shortid.generate(), isAdmin: true }
        const token = new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        } as any as Request & {user?:IUser}
        const res={} as any as Response
        const next = jest.fn();

        auth(req,res,next);
        expect(req.user).toMatchObject(user);
    })
})