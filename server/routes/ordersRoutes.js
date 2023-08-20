const express = require('express');
const router = express.Router();


const OrdersController = require('../controllers/ordersController');


router.post('/saveAddress/:id', OrdersController.saveAddress);
router.get('/getAddress/:id', OrdersController.getAddress);
router.post('/insertOrder', OrdersController.insertOrder);



module.exports = router;