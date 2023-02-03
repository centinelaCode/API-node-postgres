const faker = require('faker');


class UserService {

   constructor() {
      this.users = [];
      this.generate();
   }

   generate() {
      const limit = 100;
      for (let index = 0; index < limit; index++) {
         this.users.push({
            id: faker.datatype.uuid(),
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            area: faker.name.jobArea(),
            web: faker.internet.domainName(),
            email: faker.internet.email(),
            password: faker.internet.password(64),
         })
      }
   }

   create(){}

   find(){
      return this.users;
   }

   findOne(id) {
      return this.users.find(item => item.id === id);
   }

   update(){}

   delete(){}

}


module.exports = UserService;
