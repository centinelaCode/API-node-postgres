const express = require('express');

const productsRouter = require('./products.router')
const categoriesRouter = require('./categories.router')
const usersRouter = require('./users.router')

//TODO registramos en express cada modulo de routes - con path base
function routerApi(app) {
   const router = express.Router();
   app.use('/api/v1', router)
   router.use('/products', productsRouter);
   router.use('/categories', categoriesRouter);
   router.use('/users', usersRouter);

   //TODO sin path base (solo agregamos el /api/v1/ )
   // app.use('/api/v1/products', productsRouter);
   // app.use('/api/v1/categories', categoriesRouter);
   // app.use('/api/v1/users', usersRouter);
}

module.exports = routerApi;
