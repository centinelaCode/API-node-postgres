const express = require('express');
const UserService = require('../services/user.service')
// const validatorHandler = require('../middleweres/validator.handler');


const router = express.Router();


//TODO Instaciamos el UserService para tener acceso a sus metodos
const service = new UserService();

//? Metodo GET all
router.get('/', async (req, res, next) => {
   try {
      const users = await service.find()   ;
      res.json(users)
   } catch (error) {
      next(error);
   }
})


//? Metodo GET one
router.get('/:id', async(req, res, next) => {
   try {
      const { id } = req.params;

      const user = await service.findOne(id)   ;
      res.json(user)
   } catch (error) {
      next(error);
   }
})

//? Metodo POST
router.post('/', async(req, res, next) => {
   try {
      const body = req.body;

      const user = await service.create(body);
      res.status(201).json(user);
   } catch (error) {
      next(error);
   }
})

//? Metodo PATH
router.patch('/:id', async(req, res, next) => {
   try {
      const { id } = req.params;
      const body = req.body;

      const user = await service.update(id, body);
      res.json(user);
   } catch (error) {
      next(error);
   }
})

//? Metodo DELETE
router.delete('/:id', async(req, res, next) => {
   try {
      const { id } = req.params;

      const rta = await service.delete(id);
      res.json(rta);
   } catch (error) {
      next(error);
   }
})

module.exports = router;
