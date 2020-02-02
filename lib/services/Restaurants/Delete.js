import BaseService from '../BaseService';
import Validator   from '../Validator';
import {  ValidationError, DatabaseError } from '../../errors';

export default class Show extends BaseService {
    async validate(data) {
        const validator = new Validator();

        try {
            const validated = await validator.validateAsync({
                id : data.id
            });

            return validated;
        } catch(err) {
            throw new ValidationError(err.message);
        }
    }

    async execute(data) {
        const Restaurants = this.getContainer()['db']().getModel('Restaurants'); 

        try {
            const restaurant = await Restaurants.deleteOneById(data.id);

            return this.result({ deleted: true });
        } catch (err) {
            throw err;
        }
    }
}