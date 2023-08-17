const express = require('express');
const router = express.Router();


const ProductsControllers = require('../controllers/productsController');


router.get('/getAllProducts', ProductsControllers.getAllProducts);
router.get('/getProduct/:id', ProductsControllers.getProductByID);


module.exports = router;

