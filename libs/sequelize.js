const { Sequelize } = require('sequelize');

const { config } = require('../config/config')
const setupModels = require('../db/models')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
   dialect: 'postgres',
   logging: console.log,
});

// Ejecutamos el setup para los models
setupModels(sequelize);

// hace la sincronizacion y crea los modelos en base a la estructura
// sequelize.sync();   // deshabilitado para usar migratios

module.exports = sequelize;
