export default class BaseService {
    constructor(container) {
        this._container = container;
    }

    result (data, status = 200) {
		return {
			status,
			data
		}
	}

    getContainer() {
        return this._container;
    }
}