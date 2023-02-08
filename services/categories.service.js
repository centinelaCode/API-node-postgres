const faker = require('faker');

const { models } = require('../libs/sequelize')

class CategoryService {

   //! Constructor del service
   constructor() {
      // this.categories = [];
      // this.generate();
   }

   //! Servicio que permite crear una data de 10 categories con datos fake
   // generate() {
   //    const limit = 3;
   //    for (let index = 0; index < limit; index++) {
   //       this.categories.push({
   //          id: faker.datatype.uuid(),
   //          name: faker.commerce.productMaterial(),
   //          description: faker.commerce.productDescription(),
   //       })
   //    }
   // }

   //! Service para crera una nueva categorie
   create(data){
      const newCategorie = {
         id: faker.datatype.uuid(),
         ...data
      }

      this.categories.push(newCategorie);
      return (newCategorie);
   }

   //! Service para encontrar todas las categories
   async find(){
      const rta = await models.Category.findAll();
      return rta;
   }

   //! Service para encontrar una categorie por su ID
   findOne(id) {
      return this.categories.find(item => item.id === id);
   }

   //! Service para actualizar una categorie, desde un dato hasta todos
   update(id, changes){
      const index = this.categories.findIndex(item => item.id === id);
      if(index === -1) {
         throw new Error('Categorie not found');
      }

      const categorie = this.categories[index];
      this.categories[index] = {
         ...categorie,
         ...changes
      }

      return this.categories[index];
   }

   //! Service para eliminar una categorie (eliminación fisica)
   delete(id){
      const index = this.categories.findIndex(item => item.id === id);
      if(index === -1) {
         throw new Error('Categorie not found');
      }

      const categorieDelete = this.categories[index]
      this.categories.splice(index, 1);
      return categorieDelete;
   }

}


module.exports = CategoryService;
