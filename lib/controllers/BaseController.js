export default class BaseController {
	constructor(container) {
		this.container = container;
	}

	runService (request, response, service, method) {
		return this[method](request, response);
	}
}