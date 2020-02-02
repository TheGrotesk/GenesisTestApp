import BaseService from '../BaseService';
import Validator   from '../Validator';
import { ValidationError, NotFoundError } from '../../errors';

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
        const Restaurant = this.getContainer()['db']().getModel('Restaurants'); 

        try {
            const restaurant = await Restaurant.findOneById(data.id);

            return this.result(restaurant);
        } catch (err) {
            throw err;
        }
    }
}