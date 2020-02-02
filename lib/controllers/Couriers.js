import BaseController from './BaseController';
import Show  		  from '../services/Couriers/Show';
import Index 		  from '../services/Couriers/Index';
import Delete 		  from '../services/Couriers/Delete';
import Create		  from '../services/Couriers/Create';
import Update		  from '../services/Couriers/Update';

export default class Couriers extends BaseController {
	async index(request, response) {
		const data = request.params;

		return this.runService(Object.keys(data).length !== 0 ? data : null, new Index(this.getContainer()));
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