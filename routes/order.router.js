const express = require('express');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middleweres/validator.handler');
// const sequelizeErrorHandler = require('../middleweres/error.handler')
const {
   createOrderSchema,
   getOrderSchema,
   addItemSchema,
} = require('../schemas/order.schema');

const router = express.Router();

//TODO Instaciamos el ProductService para tener acceso a sus metodos
const service = new OrderService();

//? Metodo GET all
router.get('/', async(req, res, next) => {
   try {
      const orders = await service.find();
      res.json(orders)
   } catch (error) {
      next(error)
   }
})

//? Metodo GET one
router.get('/:id',
   validatorHandler(getOrderSchema, 'params'),
   async (req, res, next) => {
      try {
         const { id } = req.params;

         const order = await service.findOne(id);
         res.json(order);
      } catch (error) {
         next(error)
   }
})

//? Metodo POST crear una order
router.post('/',
   validatorHandler(createOrderSchema, 'body'),
   async(req, res, next) => {
      try {
         const body = await req.body;

         const newOrder = await service.create(body);
         res.status(201).json(newOrder)
      } catch (error) {
         next(error);
      }
})

//? Metodo POST crear un item
router.post('/add-item',
   validatorHandler(addItemSchema, 'body'),
   async(req, res, next) => {
      try {
         const body = await req.body;

         const newItem = await service.addItem(body);
         res.status(201).json(newItem)
      } catch (error) {
         next(error);
      }
})


//? Metodo PATH   // No implementado
// router.patch('/:id',
//    validatorHandler(getOrderSchema, 'params'),
//    validatorHandler(updateOrderSchema, 'body'),
//    async(req, res, next) => {
//       try {
//          const { id } = req.params;
//          const body = req.body;

//          const order = await service.update(id, body);
//          res.json(order);
//       } catch (error) {
//          // el error es el que se especifico en throw new Error('Product not found');
//          next(error)
//       }
// })


//? Metodo DELETE   // No implementado
// router.delete('/:id', async(req, res, next) => {
//    try {
//       const { id } = req.params;

//       await service.delete(id);
//       res.json({id});
//    } catch (error) {
//       next(error);
//    }
// })

module.exports = router;
