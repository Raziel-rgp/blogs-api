const express = require('express');
const { postController } = require('../controllers');
const { tokenValidator } = require('../middlewares/validateJWT');
const { validatePost, userPermissions } = require('../middlewares/validations');

const router = express.Router();

router.get('/', tokenValidator, postController.findAll);
router.get('/:id', tokenValidator, postController.findById);
router.put('/:id', tokenValidator, validatePost, userPermissions, postController.updateById);

module.exports = router;
