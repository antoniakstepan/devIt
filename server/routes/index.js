const Router = require('express');

const router = new Router();

const itemsRoute = require('./itemRouts')


router.use('/items', itemsRoute);

module.exports = router;
