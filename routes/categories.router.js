const express = require('express');
const router = express.Router();

const CategoryService = require('../services/categories.service');

// instaciamos el ProductService
const service = new CategoryService();

router.get('/', (req, res) => {
   const categories = service.find();
   res.json(categories)
})

router.get('/:id', (req, res) => {
   const { id } = req.params;

   const category = service.findOne(id);
   res.json(category)
})

module.exports = router;
