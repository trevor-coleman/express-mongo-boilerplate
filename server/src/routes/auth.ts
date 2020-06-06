import express, { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import debug from 'debug';
import User from '../models/User';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from '../config/config';

const log = debug('app:route:logins');
const router = express.Router();

export const authValidators = [
    check('email')
        .exists()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email must be valid email')
        .normalizeEmail(),
    check('password')
        .exists().withMessage('password is required')
        .isString().withMessage('password must be a string')
        .isLength({min:2, max:255}).withMessage('password must be between 2 and 255 characters long')
];

router.post(
    '/',
    authValidators,
    (
        async (req: Request, res: Response) => {

            log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()});
            }

            let user = await User.findOne({email: req.body.email})
            if (!user) {return res.status(400).send('Invalid email or password.') ;}

            const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
            if(!passwordIsValid) return res.status(400).send('Invalid email or password.');

            const token = user.generateAuthToken();
            res.send(token);

        }));

export default router;