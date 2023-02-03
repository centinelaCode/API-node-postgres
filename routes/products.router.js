
const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();

//TODO Instaciamos el ProductService para tener acceso a sus metodos
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

   const product = service.create(body);
   res.status(201).json(product)
})


//? Metodo PATH
router.patch('/:id', (req, res) => {
   const { id } = req.params;
   const body = req.body;

   const product = service.update(id, body);
   res.json(product);
})

//? Metodo PUT (usaremos solo patch)
// router.put('/:id', (req, res) => {
//    const { id } = req.params;
//    const body = req.body;

//    const product = service.update(id, body);
//    res.json(product);
// })


//? Metodo DELETE
router.delete('/:id', (req, res) => {
   const { id } = req.params;

   const rta = service.delete(id);
   res.json(rta);
})

module.exports = router;
