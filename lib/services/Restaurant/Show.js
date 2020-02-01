import BaseService from './../BaseService';

export default class Show extends BaseService {
    async validate(data) {
        return data;
    }

    async execute(data) {
        const Restaurant = this.getContainer()['db']().getModel('Restaurant'); 

        const restaurant = await Restaurant.findOne({
            where: {
                id: data.id
            }
        });

        return this.result(restaurant);
    }
}