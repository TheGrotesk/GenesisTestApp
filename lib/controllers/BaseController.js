export default class BaseController {
	constructor(container, logger) {
		this._container = container;
		this._logger = logger;
	}

	/**
	 * Runs constroller's method and catch the errors.
	 * @param  {[express.request]}
	 * @param  {[express.response]}
	 * @param  {[string]}
	 * @return {[objet]}
	 */
	run (request, response, method) {
		try {
			const result = this[method](request, response);	

			this.logger.log(request, result.status);

			return result;
		} catch (err) {
			this.logger.errorLog(request, err, 500);

			throw err;
		}
	}

	/**
	 * Runs service which validate request data and execute use case.
	 * @param  {[object]}
	 * @param  {[string]}
	 * @return {[object]}
	 */
	runService (data, service) {
		const validated = service.validate();

		if (validated) {
			return service.execute();
		}
	}

	/**
	 * @return {[object]}
	 */
	getConrtainer() {
		return this._container;
	}
}