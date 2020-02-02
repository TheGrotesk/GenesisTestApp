import BaseController from './BaseController';
import { Show, Index }  from '../services/Restaurants';

export default class Restaurants extends BaseController {
	async index(request, response) {
		return this.runService(null, new Index(this.getContainer()));
	}

	async show(request, response) {
		return this.runService(request.params, new Show(this.getContainer()));
	}

	update(request, response) {
		//Some logic
	}

	delete(request, response) {
		//Some logic
	}
}