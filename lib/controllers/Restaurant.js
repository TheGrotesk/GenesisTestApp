import BaseController from './BaseController';

export default class Restaurant extends BaseController {
	index(request, response) {
		//Some logic
	}

	show(request, response) {
		return this.result({ message: 'Hello world!' });
	}

	update(request, response) {
		//Some logic
	}

	delete(request, response) {
		//Some logic
	}
}