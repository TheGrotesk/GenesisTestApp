import BaseService          from '../BaseService';
import Validator            from '../Validator';
import {  ValidationError } from '../../errors';

export default class Delete extends BaseService {
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
            await Couriers.deleteOneById(data.id);

            return this.result({ deleted: true });
        } catch (err) {
            throw err;
        }
    }
}