const express = require('express');
const router = express.Router();


const OrdersController = require('../controllers/ordersController');


router.post('/saveAddress/:id', OrdersController.saveAddress);



module.exports = router;