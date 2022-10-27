const Router = require('express');

const router = new Router();

const itemsController = require('../controllers/itemController');


router.get('/', itemsController.getAll);

router.post('/', itemsController.createItem);
router.post('/delete', itemsController.deleteItem);
router.post('/edit', itemsController.updateItem)

module.exports = router;
