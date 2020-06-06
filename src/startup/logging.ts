import 'express-async-errors';
import log from '../util/logger';



const startLogging = () => {
    process.on('unhandledRejection', (e: Error) => {
        throw e;
    });

    log.info("Logging Started");

};

export default startLogging;