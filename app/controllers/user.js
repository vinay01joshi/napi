const HttpStatus = require('http-status-codes');

exports.dummy = (req, res, next) => {
    const one = req.getmethodName();
    res.status(HttpStatus.ACCEPTED).send({
        message: 'This is Dummy User',
        status: HttpStatus.ACCEPTED,
    });
}