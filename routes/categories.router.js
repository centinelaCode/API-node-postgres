const express = require('express');

const CategoryService = require('../services/categories.service');
const validatorHandler = require('../middleweres/validator.handler');

const {
   createCategorySchema,
   updateCategorySchema,
   getCategorySchema } = require('../schemas/category.schema');

const router = express.Router();

//TODO Instaciamos el CategoryService para tener acceso a sus metodos
const service = new CategoryService();


//? Metodo GET all
router.get('/', async(req, res, next) => {
   try {
      const categories = await service.find();
      res.json(categories)
   } catch (error) {
      next(error);
   }
});


//? Metodo GET one
router.get('/:id', async(req, res, next) => {
   try {
      const { id } = req.params;

      const category = service.findOne(id);
      res.json(category)
   } catch (error) {
      next(error);
   }
})


//? Metodo POST
router.post('/',
   validatorHandler(createCategorySchema, 'body'),
   async(req, res, next) => {
      try {
         const body = req.body;

         const categorie = await service.create(body);
         res.status(201).json(categorie);
      } catch (error) {
         next(error)
      }
})


//? Metodo PATCH
router.patch('/:id',
   validatorHandler(getCategorySchema, 'params'),
   validatorHandler(updateCategorySchema, 'body'),
   async(req, res, next) => {
   try {
      const { id } = req.params;
      const body = req.body;

      const categorie = await service.update(id, body);
      res.json(categorie);
   } catch (error) {
      next(error)
   }
})


//? Metodo DELETE
router.delete('/:id',
   validatorHandler(getCategorySchema, 'params'),
   async(req, res, next) => {
   try {
      const { id } = req.params;

      await service.delete(id);
      res.json({ id });
   } catch (error) {
      next(error)
   }
})

module.exports = router;
