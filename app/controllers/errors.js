const path = require('path');
const HttpStatus = require("http-status-codes");
const config = require(path.resolve('config/logentries'));
var Logger = require('le_node');
var loggerEntries = new Logger({ token: config.token });

exports.errorHandler = function (error, req, res, next) {
    if (error === undefined) {
        return;
    }

    if (!error) return next();

    if (res.headersSent) {
        return exports.logError(error, req);
    }
    const notFoundMessage = 'Not Found';
    //for example id not sent as integer number
    if (error.name === 'CastError') {
        if (process.env.NODE_ENV === 'production') {
            exports.logError(error, req);

            return res.status(HttpStatus.NOT_FOUND).send({ message: notFoundMessage, status: HttpStatus.NOT_FOUND });
        }

        return res.status(HttpStatus.BAD_REQUEST).send({ message: 'cast_error', status: HttpStatus.BAD_REQUEST, ...error });

    }

    if (error.status === HttpStatus.NOT_FOUND) {
        exports.logError(error, req);
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message || notFoundMessage, status: HttpStatus.NOT_FOUND });
    }

    if (error.status === HttpStatus.BAD_REQUEST) {

        exports.logError(error, req);

        return res.status(HttpStatus.BAD_REQUEST).send({ message: error.message || 'not_found', status: HttpStatus.BAD_REQUEST });
    }

    //TODO check for sequelize error as well. send 4xx errors when validation occurs

    if (error.type && error.type === 'StripeInvalidRequestError') {
        return res.status(HttpStatus.BAD_REQUEST).send({ message: error.message, ...error })
    }

    // Log it
    exports.logError(error, req);

    if (process.env.NODE_ENV === 'production') {
        //return res.status(500).send({message:'internal_server_error');
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error', status: HttpStatus.INTERNAL_SERVER_ERROR });
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error', error: error.message, stack: error.stack, status: HttpStatus.INTERNAL_SERVER_ERROR });

};

exports.logError = function (error, req) {
    if (!error instanceof Error) {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            throw Error('error object should be instance of error');
        }
    }

    if (process.env.NODE_ENV === 'production') {
        loggerEntries.err(error)
    } else {
        console.log(error);
    }
};