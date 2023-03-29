const express = require('express');
const { postController } = require('../controllers');
const { tokenValidator } = require('../middlewares/validateJWT');
const { validatePost, userPermissions, validatePostSchema } = require('../middlewares/validations');

const router = express.Router();

router.post('/', tokenValidator, validatePost, validatePostSchema, postController.createPost);
router.get('/', tokenValidator, postController.findAll);
router.get('/:id', tokenValidator, postController.findById);
router.put('/:id', tokenValidator, validatePost, userPermissions, postController.updateById);
router.delete('/:id', tokenValidator, userPermissions, postController.deleteById);

module.exports = router;
