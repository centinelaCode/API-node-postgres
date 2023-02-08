const faker = require('faker');

// const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize')


class UserService {

   //! Constructor del service
   constructor() {
      // this.users = [];
      // this.generate();
   }

   //! Servicio que permite crear una data de 10 users con datos fake
   // generate() {
   //    const limit = 3;
   //    for (let index = 0; index < limit; index++) {
   //       this.users.push({
   //          id: faker.datatype.uuid(),
   //          firstname: faker.name.firstName(),
   //          lastname: faker.name.lastName(),
   //          area: faker.name.jobArea(),
   //          web: faker.internet.domainName(),
   //          email: faker.internet.email(),
   //          password: faker.internet.password(64),
   //       })
   //    }
   // }

   //! Service para crera un nuevo user
   create(data){
      const newUser = {
         id: faker.datatype.uuid(),
         ...data
      }

      this.users.push(newUser);
      return newUser;
   }

   //! Service para encontrar todos los users
   async find(){
      //! Ejecutando el query
      // const client = await getConnection();
      // const rta = await client.query('SELECT * FROM task');
      // return rta.rows;

      //! Usando los metodos de sequelize
      const rta = await models.User.findAll();
      return rta;


   }

   //! Service para encontrar un user por su ID
   findOne(id) {
      return this.users.find(item => item.id === id);
   }

   //! Service para actualizar un user, desde un dato hasta todos
   update(id, changes){
      const index = this.users.findIndex(item => item.id === id);
      if(index === -1) {
         throw new Error('Product not found');
      }

      const user = this.users[index];
      this.users[index] = {
         ...user,
         ...changes
      }

      return this.users[index];
   }

   //! Service para eliminar un user (eliminación fisica)
   delete(id){
      const index = this.users.findIndex(item => item.id === id);
      if(index === -1) {
         throw new Error('Product not found');
      }

      const userDelete = this.users[index];
      this.users.splice(index, 1);

      return userDelete;
   }
}

module.exports = UserService;
