import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const getPort: ()=>number|undefined = ()=>{
    if (process.env.NODE_ENV==='test') return 7897
    return process.env.PORT ? parseInt(process.env.PORT) : 3000;
}

const port=getPort();
const getMongoUrl: ()=>string | undefined = ()=>{
    console.log("ENVIRONMENT IS: " + process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case "test":
            console.log("TEST")
            return process.env.BOILERPLATE_MONGODB_TEST;
        case "development":
            console.log("DEV")
            return process.env.BOILERTPLATE_MONGODB_DEV;
        case "production":
            console.log("PROD")
            return process.env.BOILERPLATE_MONGODB_PROD
        default:
            throw new Error("unknown environment")
    }
}

const mongoURLString = getMongoUrl();
if(!mongoURLString) throw new Error(`Mongo connection string is ${mongoURLString}`);
console.log(`got MongoString + ${mongoURLString.substr(0,12)}...`);

const env =  {
    port: port,
    nodeEnv: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET as jwt.Secret,
    mongoURL: mongoURLString
}

export const environment = env;



