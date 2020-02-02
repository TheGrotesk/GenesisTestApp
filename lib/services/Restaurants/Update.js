import BaseService          from '../BaseService';
import Validator            from '../Validator';
import {  ValidationError } from '../../errors';

export default class Update extends BaseService {
    async validate(data) {
        try {
            const validator = new Validator();

            const rules = {
                id   : validator.id(),
                fields : validator.object({
                    name : validator.restaurantName()
                })
            };

            const validated = await validator.validate(rules, data);

            return validated;
        } catch(err) {
            throw new ValidationError(err.message);
        }
    }

    async execute(data) {
        const Restaurants = this.getContainer()['db']().getModel('Restaurants'); 

        try {
            const id = data.id;
            const fields = data.fields;

            const restaurant = await Restaurants.updateOneById(id, fields);

            return this.result(restaurant);
        } catch (err) {
            throw err;
        }
    }
}