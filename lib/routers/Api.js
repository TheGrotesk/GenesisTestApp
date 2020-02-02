import express 		 	from 'express';
import RequestLogger 	from './../utils/RequestLogger';
import { 
	Restaurants,
	Couriers,
	Clients,
	Orders 
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

		//Clients routes
		this.router.get('/clients/:id', (request, response) => {
			return new Clients(container, apiLogger).run(request, response, 'show');
		});

		this.router.get('/clients/', (request, response) => {
			return new Clients(container, apiLogger).run(request, response, 'index');
		});

		this.router.delete('/clients/:id', (request, response) => {
			return new Clients(container, apiLogger).run(request, response, 'delete');
		});

		this.router.post('/clients/', (request, response) => {
			return new Clients(container, apiLogger).run(request, response, 'create');
		});

		this.router.put('/clients/:id', (request, response) => {
			return new Clients(container, apiLogger).run(request, response, 'update');
		});

		//Orders routes
		this.router.get('/orders/:id', (request, response) => {
			return new Orders(container, apiLogger).run(request, response, 'show');
		});

		this.router.get('/orders/', (request, response) => {
			return new Orders(container, apiLogger).run(request, response, 'index');
		});

		this.router.post('/orders/', (request, response) => {
			return new Orders(container, apiLogger).run(request, response, 'create');
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