const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.getRetrieveUsers);

router.get('/create', userController.getCreateUser);

router.get('/:userId/update', userController.getUpdateUser);

router.post('/:userId/update', userController.putUpdateUser);

router.get('/:userId/delete', userController.deleteUser);

module.exports = router;
