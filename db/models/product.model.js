const { DataTypes, Model, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
   id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
   },
   name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
   },
   price: {
      allowNull: false,
      type: DataTypes.INTEGER,
   },
   image: {
      allowNull: true,
      type: DataTypes.STRING,
   },
   createAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'create_at',
      defaultValue: Sequelize.NOW
   }
}

class Product extends Model {
   static associate() {
      // associate
   }

   static config(sequelize) {
      return {
         sequelize,
         tableName: PRODUCT_TABLE,
         modelName: 'Product',
         timestamps: false,
      }
   }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
