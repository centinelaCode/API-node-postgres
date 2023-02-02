
const productsRouter = require('./products.router')
const categoriesRouter = require('./categories.router')
const usersRouter = require('./users.router')

// registramos en express cada modulo de routes
function routerApi(app) {
   app.use('/api/products', productsRouter);
   app.use('/api/categories', categoriesRouter);
   app.use('/api/users', usersRouter);
}

module.exports = routerApi;
