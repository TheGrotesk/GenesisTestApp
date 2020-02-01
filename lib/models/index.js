'use strict';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import * as conf from './../../config/db.json';
import Restaurant from './Restaurant';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = conf[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

Restaurant.init(sequelize, Sequelize);


export default sequelize;
