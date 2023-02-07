const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service')

//TODO Instaciamos el UserService para tener acceso a sus metodos
const service = new UserService();

//? Metodo GET all
router.get('/', async (req, res) => {
   const users = await service.find()   ;
   res.json(users)
})


//? Metodo GET one
router.get('/:id', (req, res) => {
   const { id } = req.params;

   const user = service.findOne(id)   ;
   res.json(user)
})

//? Metodo POST
router.post('/', (req, res) => {
   const body = req.body;

   const user = service.create(body);
   res.status(201).json(user);
})

//? Metodo PATH
router.patch('/:id', (req, res) => {
   const { id } = req.params;
   const body = req.body;

   const user = service.update(id, body);
   res.json(user);
})

//? Metodo DELETE
router.delete('/:id', (req, res) => {
   const { id } = req.params;

   const rta = service.delete(id);
   res.json(rta);
})

module.exports = router;
