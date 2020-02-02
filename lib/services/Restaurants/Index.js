import BaseService from '../BaseService';

export default class Show extends BaseService {
    async validate(data) {
        return data;
    }

    async execute(data) {
        const Restaurant = this.getContainer()['db']().getModel('Restaurants'); 

        const restaurant = await Restaurant.findAll({
            order : ['createdAt']
        });

        return this.result(restaurant !== null ? restaurant : {});
    }
}