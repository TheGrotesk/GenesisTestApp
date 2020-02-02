import BaseController from './BaseController';
import Show  		  from '../services/Restaurants/Show';
import Index 		  from '../services/Restaurants/Index';
import Delete 		  from '../services/Restaurants/Delete';
import Create		  from '../services/Restaurants/Create';
import Update		  from '../services/Restaurants/Update';

export default class Restaurants extends BaseController {
	async index(request, response) {
		return this.runService(null, new Index(this.getContainer()));
	}

	async show(request, response) {
		return this.runService(request.params, new Show(this.getContainer()));
	}
	
	async create(request, response) {
		return this.runService(request.body, new Create(this.getContainer()));
	}

	async update(request, response) {
		const data = {
			...request.params,
			...request.body
		};

		return this.runService(data, new Update(this.getContainer()));
	}

	async delete(request, response) {
		return this.runService(request.params, new Delete(this.getContainer()));
	}
}