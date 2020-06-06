import shortid from 'shortid';
import { Request, Response, NextFunction } from 'express';

const validateShortId = (req: Request,res: Response,next:NextFunction)=>{
    if(!shortid.isValid(req.params.id))
        return res.status(422).send("invalid Id");

    next();
}

export default validateShortId;