// const faker = require('faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

// const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize')

class ProductService {

   //! Constructor del service
   constructor() {}

   //! Servicio que permite crear una data de 10 productos con datos fake
   // generate() {
   //    const limit = 5;
   //    for (let index = 0; index < limit; index++) {
   //       this.products.push({
   //          id: faker.datatype.uuid(),
   //          name: faker.commerce.productName(),
   //          price: parseInt(faker.commerce.price(), 10),
   //          image: faker.image.imageUrl(),
   //          isBlock: faker.datatype.boolean(),
   //       });
   //    }
   // }

   //! Service para crera un nuevo producto
   async create(data){
      const newProduct = await models.Product.create(data);
      return newProduct;
   }

   //! Service para encontrar todos los productos
   async find(limit, offset, priceMin = 0, priceMax = 10000000){
      //! con sequelize with model
      const options = {
         include: ['category'],
         where: {
            price: {
               [Op.between]: [priceMin, priceMax]
            }
         }
      }

      // Si se mandan limit y offset se agregan a las options para hacer paginacion
      if(limit && offset) {
         options.limit = limit;
         options.offset = offset;
      }

      const products = await models.Product.findAll(options);
      return products;
   }

   //! Service para encontrar un producto por su ID
   async findOne(id) {
      const product = await models.Product.findAll({
         where:{ id: id },
         include: ['category']
      });
      if(!product) {
         throw boom.notFound('Product not found')
         // return {message: 'El producto especificado no existe'}
      }
      return product;
   }

   //! Service para actualizar un producto, desde un dato hasta todos
   async update(id, changes){
      // verica si existe, si existe lo actualiza si no puede actualizarlo, envia el error
      const product = await this.findOne(id);
      const rta = await product.update(changes);
      return rta;
   }

   //! Service para eliminar un producto (eliminación fisica)
   async delete(id){
      // verica si existe, si existe lo elimina si no, envia el error
      const product = await this.findOne(id);
      await product.destroy();
      return { id };
   }
}

module.exports = ProductService;
