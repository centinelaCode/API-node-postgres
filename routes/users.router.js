const express = require('express');
const router = express.Router();
const faker = require('faker');

router.get('/', (req, res) => {
   // obtenemos losa query params para el numero de categories
   const { size } = req.query;

   // creamos una data fake
   const users = [];
   const limit = size || 10;
   for (let index = 0; index < limit; index++) {
      users.push({
         firstname: faker.name.firstName(),
         lastname: faker.name.lastName(),
         area: faker.name.jobArea(),
         web: faker.internet.domainName(),
         email: faker.internet.email(),
         password: faker.internet.password(64),
      })
   }
   res.json(users)

})

module.exports = router;
