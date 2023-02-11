const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

   async find() {
      const rta = await models.Customer.findAll({
         include: ['user']
      });
      return rta;
   }

   async findOne(id) {
      const customer = await models.Customer.findAll({
         where: { id: id },
         include: ['user']
      });
      if (!customer) {
      throw boom.notFound('customer not found');
      }
      return customer;
   }

   async create(data) {
      //! forma 1 de hacerlo
      // primero creamos el user (en la data va la info del user)
      // const newUser = await models.User.create(data.user);
      // despues creamos el customer le pasamos la data y el id del nuevo user
      // const newCustomer = await models.Customer.create({
      //    ...data,
      //    userId: newUser.id
      // });

      //! forma 2 de hacerlo
      // solo le pasamos la data y especificamos que incluya la asociación del sub ojeto user
      // el cual ya se especifico en el schema
      const newCustomer = await models.Customer.create(data, {
         include: ['user']
      });
      return newCustomer;
   }

   async update(id, changes) {
      const model = await this.findOne(id);
      const rta = await model.update(changes);
      return rta;
   }

   async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { rta: true };
   }
}

module.exports = CustomerService;
