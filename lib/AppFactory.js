import * as routers  from './routers';
import * as db  	 from './models';
import express 		 from 'express';
import RequestLogger from './utils/RequestLogger';
import Api 			 from './routers/Api';

export default class App {
	constructor(config) {
		this.config = config;
		this.container = {};

		this.app = express();
		this.containerization();

		this.router = new Api(this.container);
	}

	containerization() {
		this.container['config'] = this.config;
		this.container['db'] = db;
	}

	run() {
		this.app.use(this.config.apiPrefix, this.router.initRoutes());

		this.app.listen(this.config.port, () => {
			console.log(`App listen on port ${this.config.port}...`);
		});
	}
}
