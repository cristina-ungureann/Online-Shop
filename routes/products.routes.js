const express = require('express');
const prodController = require('../controllers/prod.controller');

const router = express.Router();

router.get('/products', prodController.getProductsPage);

module.exports = router;