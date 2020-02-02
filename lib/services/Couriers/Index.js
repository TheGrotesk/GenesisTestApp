import BaseService         from '../BaseService';
import Validator           from '../Validator';
import { ValidationError } from '../../errors';

export default class Index extends BaseService {
    async validate(data) {
        if (data) {
            try {
                const validator = new Validator();
    
                const rules = {
                    restaurantId : validator.id()
                };
    
                const validated = await validator.validate(rules, data);
    
                return validated;
            } catch(err) {
                throw new ValidationError(err.message);
            }
        }

        return data;
    }

    async execute(data) {
        const Couriers = this.getContainer()['db']().getModel('Couriers'); 

        let couriers;

        if (data) {
            couriers = await Couriers.findByRestaurantId(data.restaurantId, this.getContainer()['db']());
        } else {
            couriers = await Couriers.getAllCouriers();
        }

        return this.result(couriers);
    }
}