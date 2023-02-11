const { User, UserSchema } = require('./user.model')
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Customer, CustomerSchema } = require('./customer.model');


function setupModels(sequelize) {
   // inits de los models
   User.init(UserSchema, User.config(sequelize));
   Product.init(ProductSchema, Product.config(sequelize));
   Category.init(CategorySchema, Category.config(sequelize));
   Customer.init(CustomerSchema, Customer.config(sequelize));

   // asociations
   User.associate(sequelize.models); // Para tener la asocin del customer en el user
   Customer.associate(sequelize.models);  // forenkey debera estar en la tabla customer
}

module.exports = setupModels;
