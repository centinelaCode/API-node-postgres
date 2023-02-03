const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service')

// instaciamos el UserService
const service = new UserService();

router.get('/', (req, res) => {
   const users = service.find()   ;
   res.json(users)
})

router.get('/:id', (req, res) => {
   const { id } = req.params;

   const user = service.findOne(id)   ;
   res.json(user)
})

module.exports = router;
