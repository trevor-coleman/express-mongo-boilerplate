import { check, CustomValidator } from 'express-validator';
import shortid from 'shortid';
import debug from 'debug';
const log = debug('app:middleware:custom-validators');

export const isValidShortId: CustomValidator = (value, {req}) => {
        if (!shortid.isValid(value)) {
            throw new Error('Invalid id ');
        }
        return true;
}

export const isArrayOfValidIds: CustomValidator = (value, {req})=>{
    log(`isArrayOfValidIds(${value})`)
    value.forEach((item:any) => {
        if (!shortid.isValid(item)) {
            throw new Error('Invalid id ');
        }
    })
    return true;
}