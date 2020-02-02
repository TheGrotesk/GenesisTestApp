import express 		 	from 'express';
import RequestLogger 	from './../utils/RequestLogger';
import { 
	Restaurants 
} 	from './../controllers';

export default class Api {
	constructor(container) {
		this._container = container;
		this.router = new express.Router();
	}

	/**
	 * @return {[express.Router]}
	 */
	initRoutes() {
		const container = this.getContainer();
		const apiLogger = new RequestLogger(container.config.logger);
		
		//Restaraunt routes
		this.router.get('/restaurants/:id', (request, response) => {
			return new Restaurants(container, apiLogger).run(request, response, 'show');
		});

		this.router.get('/restaurants/', (request, response) => {
			return new Restaurants(container, apiLogger).run(request, response, 'index');
		});

		this.router.delete('/restaurants/:id', (request, response) => {
			return new Restaurants(container, apiLogger).run(request, response, 'delete');
		});

		this.router.post('/restaurants/', (request, response) => {
			return new Restaurants(container, apiLogger).run(request, response, 'create');
		});

		this.router.put('/restaurants/:id', (request, response) => {
			return new Restaurants(container, apiLogger).run(request, response, 'update');
		});

		return this.router;
	}

	/**
	 * @return {[object]}
	 */
	getContainer() {
		return this._container;
	}
}