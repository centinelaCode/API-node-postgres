const { DataTypes, Model, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model')

const PRODUCT_TABLE = 'products';

const ProductSchema = {
   id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.TEXT,
   },
   price: {
      allowNull: false,
      type: DataTypes.INTEGER,
   },
   image: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'create_at',
      defaultValue: Sequelize.NOW
   },
   categoryId: {
      field: 'category_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
         model: CATEGORY_TABLE,
         key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
   }
}

class Product extends Model {
   static associate(models) {
      this.belongsTo(models.Category, {
         as: 'category'
      })
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
