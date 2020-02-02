import BaseService          from '../BaseService';
import Validator            from '../Validator';
import {  ValidationError } from '../../errors';

export default class Create extends BaseService {
    async validate(data) {
        try {
            const validator = new Validator();

            const rules = {
                data: validator.array().items({
                    name : validator.name(),
                })
            };

            const validated = await validator.validate(rules, data);

            return validated;
        } catch(err) {
            throw new ValidationError(err.message);
        }
    }

    async execute(data) {
        const Clients = this.getContainer()['db']().getModel('Clients'); 

        try {
            const client = await Clients.createFromArray(data.data);

            return this.result(client);
        } catch (err) {
            throw err;
        }
    }
}