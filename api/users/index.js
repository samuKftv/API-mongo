const router = require('express').Router();
const controller = require('./users.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/',controller.create);
router.patch('/:id', controller.updateById);
router.delete('/:id', controller.deleteById)


module.exports = router;