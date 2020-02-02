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
        const Clients = this.getContainer()['db']().getModel('Clients'); 

        try {
            const client = await Clients.findOneById(data.id);

            return this.result(client);
        } catch (err) {
            throw err;
        }
    }
}