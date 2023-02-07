
const { Sequelize } = require('sequelize');

const { config } = require('../config/config')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
   dialect: 'postgres',
   logging: function (str) {
      // do your own logging
      console.log(str);
  }
});


module.exports = sequelize;
