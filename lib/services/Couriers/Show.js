import BaseService from '../BaseService';
import Validator   from '../Validator';
import { ValidationError } from '../../errors';

export default class Show extends BaseService {
    async validate(data) {
        try {
            const validator = new Validator();

            const rules = {
                id : validator.id()
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
            const courier = await Couriers.findOneById(data.id);

            return this.result(courier);
        } catch (err) {
            throw err;
        }
    }
}