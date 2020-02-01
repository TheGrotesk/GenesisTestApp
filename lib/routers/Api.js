import express from 'express';

export default class Api {
	constructor() {
		this.router = new express.Router();
	}

	initRoutes() {
		//Restoraunt routes
		this.router.get('/restourant/:id', () => { });


		return this.router;
	}
}