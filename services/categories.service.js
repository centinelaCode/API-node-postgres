const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom');

class CategoryService {

   //! Constructor del service
   constructor() {}

   //! Service para crera una nueva categorie
   async create(data){
      const newCategory = await models.Category.create(data);
      return newCategory;
   }

   //! Service para encontrar todas las categories
   async find(){
      const categories = await models.Category.findAll();
      return categories;
   }

   //! Service para encontrar una categorie por su ID
   async findOne(id) {
      const category = await models.Category.findAll({
         where: { id: id },
         include: ['products']
      });
      if(!category){
         throw boom.notFound('Product not found')
      }

      return category;
   }

   //! Service para actualizar una categorie, desde un dato hasta todos
   async update(id, changes){
      const category = await this.findOne(id);
      const rta = await category.update(changes);
      return rta;
   }

   //! Service para eliminar una categorie (eliminación fisica)
   async delete(id){
     const category = await this.findOne(id);
     await category.destroy();
     return { id };
   }
}

module.exports = CategoryService;
