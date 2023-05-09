const Route = require('express');
const router = new Route();
const devicesController = require('../controller/devices.controller')

router.post('/device', devicesController.createDevice);
router.get('/device', devicesController.getDevices);
router.get('/device/:id', devicesController.getOneDevice);
router.put('/device', devicesController.updateDevice);
router.delete('/device/:id', devicesController.deleteDevice);

module.exports = router;