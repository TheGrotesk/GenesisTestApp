import BaseController from './BaseController';
import db from './../models';

export default class Restaurant extends BaseController {
	index(request, response) {
		//Some logic
	}

	async show(request, response) {
		const Restaurant = db.model('Restaurant');

		console.log(await Restaurant.findAll());

		return this.result({  });
	}

	update(request, response) {
		//Some logic
	}

	delete(request, response) {
		//Some logic
	}
}