const express = require('express');
const { userController } = require('../controllers');
const { tokenValidator } = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', userController.userRegister);
router.get('/', tokenValidator, userController.findAll);
router.get('/:id', tokenValidator, userController.findById);
router.delete('/me', tokenValidator, userController.deleteUsuario);

module.exports = router;