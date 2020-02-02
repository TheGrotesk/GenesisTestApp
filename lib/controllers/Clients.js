import BaseController from './BaseController';
import Show  		  from '../services/Clients/Show';
import Index 		  from '../services/Clients/Index';
import Delete 		  from '../services/Clients/Delete';
import Create		  from '../services/Clients/Create';
import Update		  from '../services/Clients/Update';

export default class Clients extends BaseController {
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