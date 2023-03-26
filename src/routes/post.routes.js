const express = require('express');
const { postController } = require('../controllers');
const { tokenValidator } = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/', tokenValidator, postController.findAll);
router.get('/:id', tokenValidator, postController.findById);

module.exports = router;
