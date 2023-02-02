
const express = require('express');
const faker = require('faker');

const router = express.Router();

//? Metodo GET all
router.get('/', (req, res) => {
   // obtenemos losa query params para el numero de productos
   const { size } = req.query;

   // creamos una data fake
   const products = [];
   const limit = size || 10;
   for (let index = 0; index < limit; index++) {
      products.push({
         name: faker.commerce.productName(),
         price: parseInt(faker.commerce.price(), 10),
         image: faker.image.imageUrl(),
      })
   }
   res.json(products)
})


//? Metodo GET
router.get('/filter', (req, res) => {
   res.send('Filter')
})


//? Metodo GET one
router.get('/:id', (req, res) => {
   const { id } = req.params;

   if(id === '999') {
      res.status(404).json({
         message: 'Not Found'
      })
   } else {
      res.status(200).json(
         [
            {
               id,
               name: 'Product 1',
               price: 1000
            }
         ]
      )
   }
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
