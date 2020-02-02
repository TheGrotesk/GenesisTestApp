import BaseService          from '../BaseService';
import Validator            from '../Validator';
import {  ValidationError } from '../../errors';

export default class Create extends BaseService {
    async validate(data) {
        try {
            const validator = new Validator();

            const rules = {
                data: validator.array().items({
                    name: validator.restaurantName()
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
            const restaurant = await Restaurants.createFromArray(data.data);

            return this.result(restaurant);
        } catch (err) {
            throw err;
        }
    }
}