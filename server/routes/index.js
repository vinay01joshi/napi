const v1 = require('./versions/v1');


module.exports = (app) => {
    app.use('/', v1)
}