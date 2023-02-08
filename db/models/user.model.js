const { DataTypes, Model } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
   id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
   },
   email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
   },
   password: {
      allowNull: false,
      type: DataTypes.STRING,
   },
}

class User extends Model {
   static associate() {
      // associate
   }

   static config(sequelize) {
      return {
         sequelize,
         tableName: USER_TABLE,
         modelName: 'User',
         timestamp: true,
      }
   }
}

module.exports = { USER_TABLE, UserSchema, User }
