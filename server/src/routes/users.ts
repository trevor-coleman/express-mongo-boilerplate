import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User, { userValidators, IUser } from '../models/User';
import debug from 'debug';
import _ from 'lodash'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from '../config/config';
import auth, { AuthorizedRequest } from '../middleware/auth';

const log = debug('app:route:users');
const router = express.Router();

router.post(
    '/',
    userValidators,
    (
        async (req: Request, res: Response) => {

            log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()});
            }

            let user = await User.findOne({email: req.body.email})
            if (user) return res.status(400).send('User already registered.')

            const newUser = new User(_.pick(req.body, ['name', 'email', 'password']));

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt)

            log(`Adding user - ${newUser.name} - ${newUser.email}`);
            await newUser.save()
            const token = newUser.generateAuthToken();
            res.header("x-auth-token", token).status(200).send(_.pick(newUser, ['id']))

        }));

router.get('/me', auth, async (req: AuthorizedRequest, res:Response) => {
    const user = await User.findById(req.user!._id).select('-password');
    res.status(200).send(user)


})

export default router;