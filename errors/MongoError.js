class MongoError extends Error {
    constructor(status, message) {
        super(message);

        this.status = status;
    }
}

/**
 * @type {MongoError}
 */
module.exports = MongoError;
