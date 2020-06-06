import './uncaught'
import { environment } from './config/config';
import startLogging from './startup/logging';
import createServer from './startup/server';
import log from './util/logger';

console.log('begining startup');

const {port, nodeEnv} = environment;

console.log('launching Logger');
startLogging();
log.info(`got ${port} and ${nodeEnv} from environment`);
log.info(`startedLogging`);

const app = createServer();

const server = app.listen(port, () => {
    log.info(`Server is listening on port ${port} -- env: ${nodeEnv}`);
});

module.exports = server;



