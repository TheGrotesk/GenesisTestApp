import Sequelize from 'sequelize';
import models from './models';
import config from './../config';

const { database, username, password, host, port, dialect } = config[process.enc.MODE || 'development'];

const sequelize = new Sequelize(database, username, password, {
	insecureAuth: true,
	host,
	port,
	pool         : {
        min     : 0,
        max     : 30,
        idle    : 10000, // The maximum time, in milliseconds, that a connection can be idle before being released.
        acquire : 60000 // ..., that pool will try to get connection before throwing error
    },
    retry : { // Set of flags that control when a query is automatically retried.
        match : [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
            /TimeoutError/
        ],
        max : 4 // How many times a failing query is automatically retried.
    },
    dialect,
    logging : false
});

export default sequelize;