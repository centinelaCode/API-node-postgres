const express = require('express');
const router = express.Router();

const CategoryService = require('../services/categories.service');

//TODO Instaciamos el CategoryService para tener acceso a sus metodos
const service = new CategoryService();

//? Obtiene todas las categorias
router.get('/', (req, res) => {
   const categories = service.find();
   res.json(categories)
})


//? Obtiene una categoria por id
router.get('/:id', (req, res) => {
   const { id } = req.params;

   const category = service.findOne(id);
   res.json(category)
})

module.exports = router;
