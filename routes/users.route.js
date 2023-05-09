const Route = require('express');
const router = new Route();
const UsersController = require('../controller/users.controller')

router.post('/user', UsersController.createUser);
router.get('/user', UsersController.getUsers);
router.get('/user/:id', UsersController.getOneUser);
router.put('/user', UsersController.updateUser);
router.delete('/user/:id', UsersController.deleteUser);

module.exports = router;