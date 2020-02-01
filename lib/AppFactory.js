import DataBase  	 from './DataBase';
import express 		 from 'express';
import Api 			 from './routers/Api';

export default class App {
	constructor(config, dbConfig) {
		this.config = config;
		this.dbConfig = dbConfig;
		this.container = {};

		this.app = express();
		this.containerization();

		this.router = new Api(this.container);
	}

	containerization() {
		this.container['config'] = this.config;
		this.container['db'] = () => {
			const db = new DataBase(this.dbConfig[process.env.NODE_ENV || 'development']);

			return db;
		};
	}

	run() {
		this.app.use(this.config.apiPrefix, this.router.initRoutes());

		this.app.listen(this.config.port, () => {
			console.log(`App listen on port ${this.config.port}...`);
		});
	}
}
