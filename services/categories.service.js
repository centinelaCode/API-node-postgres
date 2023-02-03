const faker = require('faker');

class CategoryService {

   constructor() {
      this.categories = [];
      this.generate();
   }

   generate() {
      const limit = 100;
      for (let index = 0; index < limit; index++) {
         this.categories.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productMaterial(),
            description: faker.commerce.productDescription(),
         })
      }
   }

   create(){}

   find(){
      return this.categories;
   }

   findOne(id) {
      return this.categories.find(item => item.id === id);
   }

   update(){}

   delete(){}

}


module.exports = CategoryService;
