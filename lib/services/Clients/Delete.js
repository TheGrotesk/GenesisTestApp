import BaseService from '../BaseService';
import Validator   from '../Validator';
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
        const Clients = this.getContainer()['db']().getModel('Clients'); 

        try {
            await Clients.deleteOneById(data.id);

            return this.result({ deleted: true });
        } catch (err) {
            throw err;
        }
    }
}