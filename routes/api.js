/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var contratos = require('./api/contratos.route')
var deviceRoutes = require('./api/device.route');
const notificationRoutes = require('./api/notification.route');

router.use('/users', users);
router.use('/contratos', contratos);
router.use('/devices', deviceRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
