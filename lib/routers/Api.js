import express 		 	from 'express';
import RequestLogger 	from './../utils/RequestLogger';
import { Restaurant } 	from './../controllers';

export default class Api {
	constructor(container) {
		this._container = container;
		this._router = new express.Router();
	}

	/**
	 * @return {[express.Router]}
	 */
	initRoutes() {
		const container = this.getContainer();
		const apiLogger = new RequestLogger(container.config.logFileName);
		
		//Restaraunt routes
		this._router.get('/restaurant/:id', (request, response) => {
			return new Restaurant(container, apiLogger).run(request, response, 'show');
		});

		return this._router;
	}

	/**
	 * @return {[object]}
	 */
	getContainer() {
		return this._container;
	}
}