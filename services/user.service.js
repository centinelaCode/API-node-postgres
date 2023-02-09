const boom = require('@hapi/boom');

// const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize')


class UserService {

   //! Constructor del service
   constructor() {}


   //! Service para crera un nuevo user
   async create(data){
      const newUser = await models.User.create(data);
      return newUser;
   }


   //! Service para encontrar todos los users
   async find(){
      const rta = await models.User.findAll();
      return rta;
   }


   //! Service para encontrar un user por su ID
   async findOne(id) {
      const user = await models.User.findByPk(id);
      if(!user) {
         throw boom.notFound('User not found')
         // return {message: 'El producto especificado no existe'}
      }
      return user;
   }


   //! Service para actualizar un user, desde un dato hasta todos
   async update(id, changes){
      const user = await this.findOne(id);
      const rta = await user.update(changes);
      return rta;
   }


   //! Service para eliminar un user (eliminación fisica)
   async delete(id){
      const user = await this.findOne(id);
      await user.destroy();
      return { id };
   }
}

module.exports = UserService;
