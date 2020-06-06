import { Request, Response, NextFunction } from 'express';
import log from '../util/logger'

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
    log.error(err)
    res.status(500).send("Server error");
}

export default error;