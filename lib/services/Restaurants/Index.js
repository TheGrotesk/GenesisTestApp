import BaseService from '../BaseService';

export default class Show extends BaseService {
    async validate(data) {
        return data;
    }

    async execute(data) {
        const Restaurants = this.getContainer()['db']().getModel('Restaurants'); 

        const restaurants = await Restaurants.getAllRestaurants(['id', 'name']);

        return this.result(restaurants !== null ? restaurants : {});
    }
}