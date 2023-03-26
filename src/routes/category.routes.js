const express = require('express');
const { categoryController } = require('../controllers');
const { validateCategory } = require('../middlewares/validations');
const { tokenValidator } = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', tokenValidator, validateCategory, categoryController.categoryRegister);
router.get('/', tokenValidator, categoryController.findAll);

module.exports = router;
