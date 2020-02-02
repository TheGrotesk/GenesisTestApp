import BaseService from '../BaseService';
import Validator   from '../Validator';
import {  ValidationError } from '../../errors';

export default class Create extends BaseService {
    async validate(data) {
        try {
            const validator = new Validator();

            const rules = {
                data: validator.array().items({
                    clientId : validator.id(),
                    restaurantId: validator.id(),
                    courierId: validator.id(),
                    deliveryAt: validator.string().required()
                })
            };

            const validated = await validator.validate(rules, data);

            return validated;
        } catch(err) {
            throw new ValidationError(err.message);
        }
    }

    async execute(data) {
        const Orders = this.getContainer()['db']().getModel('Orders'); 

        try {
            const orders = await Orders.createFromArray(data.data, this.getContainer()['db']());

            return this.result(orders);
        } catch (err) {
            throw err;
        }
    }
}