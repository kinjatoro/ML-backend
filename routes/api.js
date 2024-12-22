/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var contratos = require('./api/contratos.route')


router.use('/users', users);
router.use('/contratos', contratos);

module.exports = router;
