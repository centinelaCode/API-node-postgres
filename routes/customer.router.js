const express = require('express');

const CustomerService = require('../services/customers.service');
const validationHandler = require('../middleweres/validator.handler');
const {
   createCustomerSchema,
   getCustomerSchema,
   updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();


//? Metodo GET all
router.get('/',  async (req, res, next) => {
   try {
      res.json(await service.find());
   } catch (error) {
      next(error);
   }
});


//? Metodo GET One
router.get('/:id',  async (req, res, next) => {
   try {
      const { id } = req.params;

      res.json(await service.findOne(id));
   } catch (error) {
      next(error);
   }
});


//? Metodo POST
router.post('/',
   validationHandler(createCustomerSchema, 'body'),
   async (req, res, next) => {
      try {
         const body = req.body;
         res.status(201).json(await service.create(body));
      } catch (error) {
         next(error);
      }
   }
);


//? Metodo PATH
router.patch('/:id',
   validationHandler(getCustomerSchema, 'params'),
   validationHandler(updateCustomerSchema, 'body'),
   async (req, res, next) => {
      try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
      } catch (error) {
      next(error);
      }
   }
);


//? Metodo DELETE
router.delete('/:id',
   validationHandler(getCustomerSchema, 'params'),
   async (req, res, next) => {
      try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
      } catch (error) {
      next(error);
      }
   }
);

module.exports = router;
