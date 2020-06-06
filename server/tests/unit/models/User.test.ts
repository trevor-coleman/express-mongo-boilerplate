import User from '../../../src/models/User'
import jwt from 'jsonwebtoken'
import shortid from 'shortid';
import { environment } from '../../../src/config/config';

describe('User', ()=>{
    it('should return a valid JWT when called', ()=>{
        const userDetails: { _id: string; isAdmin: boolean } = {_id: shortid.generate(), isAdmin: true};
        const user = new User(userDetails)
        const token = user.generateAuthToken()
        const payload = jwt.verify(token, environment.jwtSecret)
        expect(payload).toMatchObject(userDetails)
    })
})