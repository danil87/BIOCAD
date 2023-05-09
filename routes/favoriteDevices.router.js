const Route = require('express');
const router = new Route();
const favoriteDevicesController = require('../controller/favoriteDevices.controller')

router.post('/device', favoriteDevicesController.createFavoriteDevice);
router.get('/device', favoriteDevicesController.getFavoriteDevices);
router.get('/device/:device_id/:user_id', favoriteDevicesController.getOneFavoriteDevices);
router.delete('/device/:device_id/:user_id', favoriteDevicesController.deleteFavoriteDevice);

module.exports = router;