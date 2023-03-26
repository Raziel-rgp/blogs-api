const express = require('express');
const { postController } = require('../controllers');
const { tokenValidator } = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/', tokenValidator, postController.findAll);

module.exports = router;
