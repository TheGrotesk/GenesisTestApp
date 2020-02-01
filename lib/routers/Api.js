import express from 'express';
import 

export default class Api {
	constructor() {
		this.router = new express.Router();
	}

	initRoutes() {
		//Restoraunt routes
		this.router.get('/restaurant/:id', () => { });


		return this.router;
	}
}