const express = require('express');
const router = express.Router();


const ProductsControllers = require('../controllers/productsController');


router.get('/getAllProducts', ProductsControllers.getAllProducts);
router.get('/getProduct/:id', ProductsControllers.getProductByID);
router.get('/getProductCategories', ProductsControllers.getProductCategories);


module.exports = router;

