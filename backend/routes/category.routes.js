
const express = require('express');
const { verifyToken } = require('../middleware/authJwt'); 
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.post('/', verifyToken, categoryController.createCategory);
router.get('/', verifyToken, categoryController.getCategories);
router.put('/:categoryId', verifyToken, categoryController.updateCategory);
router.delete('/:categoryId', verifyToken, categoryController.deleteCategory);

module.exports = router;
