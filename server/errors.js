'use strict';

const path = require('path'),
    errorsController = require(path.resolve('app/controllers/errors'));

module.exports = (app) => {
    app.use((req, res, next) => {
        req.on('error', (err) => {
            //TODO log error here
            errorsController.logError(err, req);
            res.end();
        });
        next();
    });

    app.use(errorsController.errorHandler);
};
