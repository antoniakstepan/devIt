const Router = require('express');

const router = new Router();

const itemsController = require('../controllers/itemController');


router.get('/', itemsController.getAll);


module.exports = router;