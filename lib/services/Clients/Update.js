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
            const id = data.id;
            const fields = data.fields;

            const client = await Clients.updateOneById(id, fields);

            return this.result(client);
        } catch (err) {
            throw err;
        }
    }
}