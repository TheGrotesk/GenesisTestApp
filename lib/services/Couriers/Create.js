import BaseService          from '../BaseService';
import Validator            from '../Validator';
import {  ValidationError } from '../../errors';

export default class Create extends BaseService {
    async validate(data) {
        try {
            const validator = new Validator();

            const rules = {
                data: validator.array().items({
                    name         : validator.name(),
                    restaurantId : validator.id(),
                    availability : validator.string().allow('AVAILABLE', 'NOT_AVAILABLE')
                })
            };

            const validated = await validator.validate(rules, data);

            return validated;
        } catch(err) {
            throw new ValidationError(err.message);
        }
    }

    async execute(data) {
        const Couriers = this.getContainer()['db']().getModel('Couriers'); 

        try {
            const couriers = await Couriers.createFromArray(data.data);

            return this.result(couriers);
        } catch (err) {
            throw err;
        }
    }
}