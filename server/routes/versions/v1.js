const path = require('path');
const express = require('express');
const router = express.Router();
const user = require(path.resolve('./app/routes/user'));

router.use('/user', user);



module.exports = router;