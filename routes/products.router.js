
const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middleweres/validator.handler');
const {
   createProductShema,
   updateProductShema,
   getProductShema } = require('../schemas/product.schema');

const router = express.Router();

//TODO Instaciamos el ProductService para tener acceso a sus metodos
const service = new ProductService();

//? Metodo GET all
router.get('/', async(req, res) => {
   const products = await service.find();
   res.json(products)
})

//? Metodo GET one
router.get('/:id',
   validatorHandler(getProductShema, 'params'),
   (req, res, next) => {
      try {
         const { id } = req.params;

         const product = service.findOne(id);
         res.json(product);
      } catch (error) {
         next(error)
   }
})

//? Metodo POST
router.post('/',
   validatorHandler(createProductShema, 'body'),
   async(req, res) => {
      const body = await req.body;

      const product = service.create(body);
      res.status(201).json(product)
})


//? Metodo PATH
router.patch('/:id',
   validatorHandler(getProductShema, 'params'),
   validatorHandler(updateProductShema, 'body'),
   async(req, res, next) => {
      try {
         const { id } = req.params;
         const body = req.body;

         const product = await service.update(id, body);
         res.json(product);
      } catch (error) {
         // el error es el que se especifico en throw new Error('Product not found');
         next(error)
      }
})

//? Metodo PUT (usaremos solo patch)
// router.put('/:id', (req, res) => {
//    const { id } = req.params;
//    const body = req.body;

//    const product = service.update(id, body);
//    res.json(product);
// })


//? Metodo DELETE
router.delete('/:id', async(req, res) => {
   const { id } = req.params;

   const rta = await service.delete(id);
   res.json(rta);
})

module.exports = router;
