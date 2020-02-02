import BaseController from './BaseController';
import Show  		  from '../services/Restaurants/Show';
import Index 		  from '../services/Restaurants/Index';
import Delete 		  from '../services/Restaurants/Delete';

export default class Restaurants extends BaseController {
	async index(request, response) {
		return this.runService(null, new Index(this.getContainer()));
	}

	async show(request, response) {
		return this.runService(request.params, new Show(this.getContainer()));
	}

	async update(request, response) {
		//Some logic
	}

	async delete(request, response) {
		return this.runService(request.params, new Delete(this.getContainer()));
	}
}