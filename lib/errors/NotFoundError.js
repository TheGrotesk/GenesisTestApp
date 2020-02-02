export default class DatabaseError extends Error {
    constructor(message, fields) {
        super(message);

        this.type = "NOT_FOUND";
        this.fields = fields;
    }
}