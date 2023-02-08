const faker = require('faker');
const boom = require('@hapi/boom');

// const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize')

class ProductService {

   //! Constructor del service
   constructor() {
      this.products = [];
      this.generate();

      // config when is for pool
      // this.pool = pool;
      // this.pool.on('error', (err) => console.error(err))
   }

   //! Servicio que permite crear una data de 10 productos con datos fake
   generate() {
      const limit = 5;
      for (let index = 0; index < limit; index++) {
         this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
            isBlock: faker.datatype.boolean(),
         });
      }
   }

   //! Service para crera un nuevo producto
   async create(data){
      const newProduct = {
         id: faker.datatype.uuid(),
         ...data
      }

      this.products.push(newProduct);
      return newProduct;
   }

   //! Service para encontrar todos los productos
   async find(){
      //! con sequelize with model
      const rta = await models.Product.findAll();
      return rta;


      //! con query
      // const query = 'SELECT * FROM task';
      // // const [data, metadata] = await sequelize.query(query);
      // const [data] = await sequelize.query(query);
      // return data;
   }

   //! Service para encontrar un producto por su ID
   findOne(id) {
      const product =  this.products.find(item => item.id === id);
      if(!product){
         throw boom.notFound('Product not found');
      }

      if(product.isBlock) {
         throw boom.conflict('Product is block')  // genera err code 409
      }

      return product;
   }

   //! Service para actualizar un producto, desde un dato hasta todos
   async update(id, changes){
      const index = this.products.findIndex(item => item.id === id);
      if(index === -1) {
         throw boom.notFound('Product not found');
      }

      // el update permite cambiar desde una sola propiedad hasta todas las propiedades
      const product = this.products[index];
      this.products[index] = {
         ...product,
         ...changes
      };

      return this.products[index];
   }

   //! Service para eliminar un producto (eliminación fisica)
   async delete(id){
      const index = this.products.findIndex(item => item.id === id);
      if(index === -1) {
         throw boom.notFound('Product not found');
      }

      const productDelete = this.products[index];
      this.products.splice(index, 1);

      return productDelete;
   }
}

module.exports = ProductService;
