function errorHandler(err, req, res, next) {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        status,
        statusCode,
        message,
    });
}

export default errorHandler;