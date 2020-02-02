import express 		 	from 'express';
import RequestLogger 	from './../utils/RequestLogger';
import { 
	Restaurants,
	Couriers 
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

		//Couriers routes
		this.router.get('/restaurants/:restaurantId/couriers/', (request, response) => {
			return new Couriers(container, apiLogger).run(request, response, 'index');
		});

		this.router.get('/couriers/', (request, response) => {
			return new Couriers(container, apiLogger).run(request, response, 'index');
		});

		this.router.post('/couriers/', (request, response) => {
			return new Couriers(container, apiLogger).run(request, response, 'create');
		});

		this.router.get('/couriers/:id', (request, response) => {
			return new Couriers(container, apiLogger).run(request, response, 'show');
		});

		this.router.put('/couriers/:id', (request, response) => {
			return new Couriers(container, apiLogger).run(request, response, 'update');
		});

		this.router.delete('/couriers/:id', (request, response) => {
			return new Couriers(container, apiLogger).run(request, response, 'delete');
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