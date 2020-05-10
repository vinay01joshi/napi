'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.get('/dummy', controller.dummy);

module.exports = router;