import { check } from 'express-validator';
import mongoose, { Schema, Document, Model } from 'mongoose';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { environment } from '../config/config';
import debug from 'debug';

const log = debug('app:model:user')

export interface IUserData {
    isAdmin: boolean;
    email: string;
    name: string;
}

export interface IUser extends Document, IUserData {
    password: string;
    generateAuthToken : ()=>string;
}

export type User = Model<IUser>;

export const userValidators = [
    check('email')
        .exists()
        .withMessage('phone number is required')
        .isEmail()
        .withMessage('email must be valid email')
        .normalizeEmail(),
    check('name')
        .exists().withMessage('name is required')
        .isString().withMessage('name must be a string')
        .isLength({min:2, max:255}).withMessage('name must be between 2 and 255 characters long'),
    check('password')
        .exists().withMessage('password is required')
        .isString().withMessage('password must be a string')
        .isLength({min:2, max:255}).withMessage('password must be between 2 and 255 characters long')
];

export const userSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
    },
    name: {
      type:String,
        required: true,
        minLength: 5,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxlength: 255,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, environment.jwtSecret);
}

const User: User = mongoose.model('User', userSchema);

export default User;