import Joi from '@hapi/joi';

export default class Validator {
    constructor() {
        return this.schema();
    }

    /**
     * Schmea of validation rules.
     * Here you can add your custom rules.
     * @return {[Joi.object]}
     */
    schema() {
        return Joi.object({
            id : Joi.string()
                .min(36)
                .max(36)
                .required()
        });
    }
}