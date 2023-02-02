
const express = require('express');
const faker = require('faker');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
   res.json({message: 'Home'})
})


app.get('/products', (req, res) => {
   // obtenemos losa query params para el numero de productos
   const { size } = req.query;

   // creamos una data fake
   const products = [];
   const limit = size || 10;
   for (let index = 0; index < limit; index++) {
      products.push({
         name: faker.commerce.productName(),
         price: parseInt(faker.commerce.price(), 10),
         image: faker.image.imageUrl(),
      })
   }
   res.json(products)
})

app.get('/products/filter', (req, res) => {
   res.send('Filter')
})

app.get('/products/:id', (req, res) => {
   const { id } = req.params;
   res.json(
      [
         {
            id,
            name: 'Product 1',
            price: 1000
         }
      ]
   )
})



app.get('/users', (req, res) => {
   const { limit, offset } = req.query;
   if( limit && offset ) {
      res.json({
         limit,
         offset
      })
   } else {
      res.send('No hay parametros')
   }
})





app.listen(PORT, () => {
   console.log('Server runing on Port ' + PORT);
})

