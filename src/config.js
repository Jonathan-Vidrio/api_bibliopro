import { config } from 'dotenv';
config();

const configDB = {
    cluster: process.env.CLUSTER_URI || ""
};

const configServer = {
    port: process.env.PORT || 3000
};

const configJWT = {
    secret: process.env.JWT_SECRET_KEY || "secret"
};

export { 
    configDB, 
    configServer, 
    configJWT 
};