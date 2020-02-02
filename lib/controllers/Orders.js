import BaseController from './BaseController';
import Show  		  from '../services/Orders/Show';
import Index 		  from '../services/Orders/Index';
import Create		  from '../services/Orders/Create';

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
}