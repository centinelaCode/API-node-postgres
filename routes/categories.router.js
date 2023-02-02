const express = require('express');
const router = express.Router();
const faker = require('faker');

router.get('/', (req, res) => {
   // obtenemos losa query params para el numero de categories
   const { size } = req.query;

   // creamos una data fake
   const categories = [];
   const limit = size || 10;
   for (let index = 0; index < limit; index++) {
      categories.push({
         name: faker.commerce.productMaterial(),
         description: faker.commerce.productDescription(),
      })
   }
   res.json(categories)

})

module.exports = router;
