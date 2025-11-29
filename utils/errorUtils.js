import { Types } from 'mongoose';

export const sourceNotFound = (resource, message = 'Resource not found') => {
    if (!resource) {
        const error = new Error(message);
        error.status = 'fail';
        error.statusCode = 404;
        throw error;
    }
}

export const invalidId = (id, message = 'Invalid resource') => {
    if (!id || !Types.ObjectId.isValid(id)) {
        const error = new Error(message);
        error.statusCode = 400;
        error.status = 'fail';
        throw error;
    }
}

// Sử dụng Named Exports cho từng hàm
export const throwIfNotFound = sourceNotFound;
