const router = require('express').Router();
const controller = require('./users.controller');

router.get('/', controller.getAll);
router.get('/:username', controller.getById);
router.post('/',controller.create);
router.patch('/:username', controller.updateById);
router.delete('/:username', controller.deleteById)


module.exports = router;