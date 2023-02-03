const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service')

//TODO Instaciamos el UserService para tener acceso a sus metodos
const service = new UserService();

//? Obtiene todos los usuarios
router.get('/', (req, res) => {
   const users = service.find()   ;
   res.json(users)
})


//? Obtiene un usuario por id
router.get('/:id', (req, res) => {
   const { id } = req.params;

   const user = service.findOne(id)   ;
   res.json(user)
})

module.exports = router;
