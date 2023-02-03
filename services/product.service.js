const faker = require('faker');

class ProductService {

   //! Constructor del service
   constructor() {
      this.products = [];
      this.generate();
   }

   //! Servicio que permite crear una data de 10 productos con datos fake
   generate() {
      const limit = 10;
      for (let index = 0; index < limit; index++) {
         this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
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
   find(){
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(this.products);
         }, 5000);
      })
   }

   //! Service para encontrar un producto por su ID
   async findOne(id) {
      return this.products.find(item => item.id === id);
   }

   //! Service para actualizar un producto, desde un dato hasta todos
   async update(id, changes){
      const index = this.products.findIndex(item => item.id === id);
      if(index === -1) {
         throw new Error('Product not found');
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
         throw new Error('Product not found');
      }

      const productDelete = this.products[index];
      this.products.splice(index, 1);

      return productDelete;
   }
}

module.exports = ProductService;
