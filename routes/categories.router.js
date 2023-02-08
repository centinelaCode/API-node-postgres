const express = require('express');
const router = express.Router();

const CategoryService = require('../services/categories.service');

//TODO Instaciamos el CategoryService para tener acceso a sus metodos
const service = new CategoryService();

//? Metodo GET all
router.get('/', async(req, res) => {
   const categories = await service.find();
   res.json(categories)
})


//? Metodo GET one
router.get('/:id', (req, res) => {
   const { id } = req.params;

   const category = service.findOne(id);
   res.json(category)
})

//? Metodo POST
router.post('/', (req, res) => {
   const body = req.body;

   const categorie = service.create(body);
   res.status(201).json(categorie);
})

//? Metodo PATCH
router.patch('/:id', (req, res) => {
   const { id } = req.params;
   const body = req.body;

   const categorie = service.update(id, body);
   res.json(categorie);
})

//? Metodo DELETE
router.delete('/:id', (req, res) => {
   const { id } = req.params;

   const rta = service.delete(id);
   res.json(rta);
})


module.exports = router;
