import {environment} from '../config/config';

const verifyConfig = () => {

    const {jwtSecret} = environment;

    if (!jwtSecret) {
        throw new Error('FATAL ERROR: jwtPrivateKey is undefined');
    }

}

export default verifyConfig;