const boom = require('@hapi/boom');
const { Association } = require('sequelize');


const { models } = require('../libs/sequelize')


class OrderService {

   //! Constructor del service
   constructor(){}

   //! Service para crera un nuevo producto
   async create(data){
      const newOrder = await models.Order.create(data);
      return newOrder;
   }


   //! Service para encontrar todos los productos
   async find(){
      //! con sequelize with model
      const orders = await models.Order.findAll();
      return orders;
   }


   //! Service para encontrar un producto por su ID
   async findOne(id) {
      const order = await models.Order.findAll({
         where:{ id: id },
         // include: ['customer']  // asi solo mostrara en la info del cliente el id del user

         // y de esta forma muestra la info del cliente y la info del user
         include: [
            {
               association: 'customer',
               include: ['user']
            }
         ]

      });
      if(!order) {
         throw boom.notFound('Product not found')
      }
      return order;
   }


   //! Service para actualizar un producto, desde un dato hasta todos
   // async update(id, changes){
   //    // verica si existe, si existe lo actualiza si no puede actualizarlo, envia el error
   //    const order = await this.findOne(id);
   //    const rta = await order.update(changes);
   //    return rta;
   // }


   //! Service para eliminar un producto (eliminación fisica)
   // async delete(id){
   //    // verica si existe, si existe lo elimina si no, envia el error
   //    const order = await this.findOne(id);
   //    await order.destroy();
   //    return { id };
   // }
}

module.exports = OrderService;
