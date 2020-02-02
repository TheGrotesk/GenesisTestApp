export default class DatabaseError extends Error {
    constructor(message, fields) {
        super(message);

        this.type = "COURIER_NOT_AVAILABLE";
        this.fields = fields;
    }
}