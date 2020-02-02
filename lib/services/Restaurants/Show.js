import BaseService from '../BaseService';
import Validator   from '../Validator';
import ValidationError from '../../errors/ValidationError';

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
        const Restaurant = this.getContainer()['db']().getModel('Restaurants'); 

        const restaurant = await Restaurant.findOne({
            where: {
                id: data.id
            }
        });

        return this.result(restaurant !== null ? restaurant : {});
    }
}