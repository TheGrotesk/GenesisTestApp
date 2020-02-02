export default class DatabaseError extends Error {
    constructor(message) {
        super(message);

        this.type = "DATABASE_ERROR";
    }
}