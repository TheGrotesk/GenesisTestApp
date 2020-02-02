export default class BaseService {
    constructor(container) {
        this._container = container;
    }

    /**
     * @param {[object]} data 
     * @param {[number]} status 
     * @returns {[object]}
     */
    result (data, status = 200) {
		return {
			status,
			data
		}
	}

    /**
     * @returns {[object]}
     */
    getContainer() {
        return this._container;
    }
}