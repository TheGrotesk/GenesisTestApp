import * as routers  from './routers';
import express 		 from 'express';
import RequestLogger from './../utils/RequestLogger';

export default class App {
	constructor(config) {
		this.config = config;

		this.app = express();

		this.containerization();

		this.router = new routers[routerName](this.container);
	}

	containerization() {
		this.container.config = this.config;
	}

	run() {
		this.app.use(this.config.apiPrefix, this.router.initRoutes());

		this.app.listen(this.config.port, () => {
			console.log(`App listen on port ${this.config.port}...`);
		});
	}
}
