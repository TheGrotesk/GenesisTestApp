import BaseService from '../BaseService';
import Validator   from '../Validator';
import {  ValidationError } from '../../errors';

export default class Update extends BaseService {
    async validate(data) {
        try {
            const validator = new Validator();

            const rules = {
                id   : validator.id(),
                fields : validator.object({
                    name : validator.courierName(),
                    restaurantId : validator.id(),
                    availability: validator.string().allow('AVAILABLE', 'NOT_AVAILABLE')
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
            const id = data.id;
            const fields = data.fields;

            const courier = await Couriers.updateOneById(id, fields);

            return this.result(courier);
        } catch (err) {
            throw err;
        }
    }
}