const {Types} = require("mongoose");

function sourceNotFound(resource, message = 'Resource not found') {
    if (!resource) {
        const error = new Error(message);
        error.status = 'fail';
        error.statusCode = 404;
        throw error;
    }
}

function invalidId(id, message = 'Invalid resource') {
    if (!id || !Types.ObjectId.isValid(id)) {
        const error = new Error(message);
        error.statusCode = 400;
        error.status = 'fail';
        throw error;
    }
}
module.exports = {
    throwIfNotFound: sourceNotFound,
    invalidId: invalidId
};


