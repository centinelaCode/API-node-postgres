
const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();

// instaciamos el ProductService
const service = new ProductService();

//? Metodo GET all
router.get('/', (req, res) => {
   const products = service.find();
   res.json(products)
})

//? Metodo GET one
router.get('/:id', (req, res) => {
   const { id } = req.params;

   const product = service.findOne(id);
   res.json(product);
})

//? Metodo POST
router.post('/', (req, res) => {
   const body = req.body;

   res.status(201).json({
      message: 'created',
      data: body
   })
})


//? Metodo PATH
router.patch('/:id', (req, res) => {
   const { id } = req.params;
   const body = req.body;

   res.json({
      message: 'Update (partial)',
      data: body,
      id
   })
})

//? Metodo PUT
router.put('/:id', (req, res) => {
   const { id } = req.params;
   const body = req.body;

   res.json({
      message: 'Update',
      data: body,
      id
   })
})


//? Metodo DELETE
router.delete('/:id', (req, res) => {
   const { id } = req.params;

   res.json({
      message: 'Delete',
      id
   })
})

module.exports = router;
