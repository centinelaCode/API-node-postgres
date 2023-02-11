const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middleweres/validator.handler');
// const sequelizeErrorHandler = require('../middleweres/error.handler')
const {
   createProductSchema,
   updateProductSchema,
   getProductSchema } = require('../schemas/product.schema');

const router = express.Router();

//TODO Instaciamos el ProductService para tener acceso a sus metodos
const service = new ProductService();

//? Metodo GET all
router.get('/', async(req, res, next) => {
   try {
      const products = await service.find();
      res.json(products)
   } catch (error) {
      next(error)
   }
})

//? Metodo GET one
router.get('/:id',
   validatorHandler(getProductSchema, 'params'),
   async (req, res, next) => {
      try {
         const { id } = req.params;

         const product = await service.findOne(id);
         res.json(product);
      } catch (error) {
         next(error)
   }
})

//? Metodo POST
router.post('/',
   validatorHandler(createProductSchema, 'body'),
   async(req, res, next) => {
      try {
         const body = await req.body;

         const newProduct = await service.create(body);
         res.status(201).json(newProduct)
      } catch (error) {
         next(error);
      }
})


//? Metodo PATH
router.patch('/:id',
   validatorHandler(getProductSchema, 'params'),
   validatorHandler(updateProductSchema, 'body'),
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


//? Metodo DELETE
router.delete('/:id', async(req, res, next) => {
   try {
      const { id } = req.params;

      await service.delete(id);
      res.json({id});
   } catch (error) {
      next(error);
   }
})

module.exports = router;
