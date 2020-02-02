import BaseService from '../BaseService';

export default class Index extends BaseService {
    async validate(data) {
        return data;
    }

    async execute(data) {
        const Restaurants = this.getContainer()['db']().getModel('Restaurants'); 

        const restaurants = await Restaurants.getAllRestaurants();

        return this.result(restaurants !== null ? restaurants : {});
    }
}