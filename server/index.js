const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '50mb', extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb', extended: true
}));

app.get('/', (req, res) => {
    res.status(200).send({
        message: "The service is online!",
        version: '1.0.2',
    });
});

module.exports = app;