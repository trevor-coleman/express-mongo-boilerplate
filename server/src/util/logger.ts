import winston, { LoggerOptions } from 'winston';
import { MongoDB } from 'winston-mongodb';
import { environment } from '../config/config';

const infoFormat = winston.format.combine(winston.format.json(), winston.format.timestamp())
const errorFormat = winston.format.errors();
const consoleFormat = winston.format.combine(winston.format.colorize({level:true, message:false}), winston.format.simple());

const mongoDBTransportInstance = (collectionName: string) => new MongoDB({
    db: environment.mongoURL,
    options: {
        useNewUrlParser: true,
        poolSize: 2,
        useUnifiedTopology: true,
    },
    collection: collectionName,
});

const options: LoggerOptions & {rejectionHandlers?: any} = {
    level: 'info',
    format: infoFormat,
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
        }),
        new winston.transports.File({filename: 'combined.log'}),
        mongoDBTransportInstance('log')
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'unhandledExceptions.log',
        }),
        mongoDBTransportInstance('unhandledExceptions')
    ],
};

const log = winston.createLogger(options);

if (environment.nodeEnv !== 'production') {
    log.add(new winston.transports.Console({
        format: consoleFormat,
        handleExceptions:true,
    }));
}

export default log;