import BaseService from '../BaseService';

export default class Index extends BaseService {
    async validate(data) {
        return data;
    }

    async execute(data) {
        const Clients = this.getContainer()['db']().getModel('Clients'); 

        return this.result(await Clients.getAllClients());
    }
}