import Joi from '@hapi/joi';

export default class Validator {
    constructor() {
        return this;
    }

    /**
     * @return {[Joi.object]}
     */
    schema(object) {
        return Joi.object(object);
    }

    /**
     * Launch async Joi validation
     * @param {[object]} rules 
     * @param {[object]} data 
     */
    async validate(rules, data) {
        return this.schema(rules).validateAsync(data);
    }

    /**
     * Here you can create your own rules. 
     */


    string() {
        return Joi.string();
    }

    array() {
        return Joi.array();
    }

    object() {
        return Joi.object();
    }

    id() {
        return this.string()
                .min(36)
                .max(36)
                .required();
    }

    restaurantName() {
        return this.string()
                .max(56)
                .required();
    }

    name() {
        return this.string()
                .max(18)
                .required();
    }
}