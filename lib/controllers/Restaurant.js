import BaseController from './BaseController';
import { Show }  from './../services/Restaurant';

export default class Restaurant extends BaseController {
	index(request, response) {
		//Some logic
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