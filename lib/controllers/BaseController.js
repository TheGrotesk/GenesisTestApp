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
	async run (request, response, method) {
		const logger = this.getLogger();

		try {
			const result = await this[method](request, response);	

			logger.log(request, result.status);

			response.header('Content-Type', 'application/json')
					.status(result.status)
					.json(result);
		} catch (err) {
			logger.errorLog(request, err, 500);

			throw err;
		}
	}

	/**
	 * Runs service which validate request data and execute use case.
	 * @param  {[object]}
	 * @param  {[string]}
	 * @return {[object]}
	 */
	async runService (data, service) {
		try {
			const validated = await service.validate(data);
			
			const result = await service.execute(validated);

			return result;
		} catch(err) {
			const logger = this.getLogger();

			logger.errorLog(
				`${this.constructor.name}->${service.constructor.name}`, 
				err.message, 
				200
			);

			return {
				status : 200,
				error : {
					type : err.type,
					message : err.message,
					fields : err.fields ? err.fields : {}
				}
			}
		}
	}

	/**
	 * @return {[object]}
	 */
	getContainer() {
		return this._container;
	}

	/**
	 * @return {[object]}
	 */
	getLogger() {
		return this._logger;
	}
}