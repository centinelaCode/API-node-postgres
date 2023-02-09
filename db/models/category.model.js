const { DataTypes, Model, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categorys';

const CategorySchema = {
   id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
   },
   name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
   },
   disponible: {
      type: DataTypes.INTEGER,
      defaultValue: 1
   },
   createAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'create_at',
      defaultValue: Sequelize.NOW
   }
}

class Category extends Model {
   static associate() {
      // associate
   }

   static config(sequelize) {
      return {
         sequelize,
         tableName: CATEGORY_TABLE,
         modelName: 'Category',
         timestamps: false,
      }
   }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category }
