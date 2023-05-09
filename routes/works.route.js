const Route = require('express');
const router = new Route();
const worksController = require('../controller/works.controller')

router.post('/work', worksController.createWork);
router.get('/work/:device_id', worksController.getAllWorks);
router.post('/getWork', worksController.getWorks);
router.put('/work', worksController.updateWork);
router.delete('/work/:id', worksController.deleteWork);

module.exports = router;