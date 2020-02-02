import BaseService from '../BaseService';

export default class Index extends BaseService {
    async validate(data) {
        return data;
    }

    async execute(data) {
        const Orders = this.getContainer()['db']().getModel('Orders'); 

        return this.result(await Orders.getAllOrders());
    }
}