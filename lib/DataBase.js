import Sequelize from 'sequelize';
import * as models from './models';

export default class DataBase {
    constructor(config) {
        this.config = config;

        this.createConnection();
        this.initModels();
        this.initRelations();
    }

    createConnection() {
        const config = this.config;

        this._connection = new Sequelize(config.database, config.username, config.password, config);
    }

    initModels() {
        Object.values(models.default).map((model) => {
            model.init(this.getConnection(), Sequelize);
        });
    }

    initRelations() {
        Object.keys(models.default).map((model) => {
            this.getModel(model).associate(this.getConnection());
        });
    }

    getConnection() {
        return this._connection;
    }

    getModel(model) {
        return this.getConnection().model(model);
    }
}