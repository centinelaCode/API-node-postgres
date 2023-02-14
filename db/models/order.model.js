const { DataTypes, Model, Sequelize } = require('sequelize');

const {CUSTOMER_TABLE} = require('./customer.model')

const ORDER_TABLE = 'orders';

const OrderSchema = {
   id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
   },
   customerId: {
      field: 'customer_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
         model: CUSTOMER_TABLE,
         key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
   },
   createAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'create_at',
      defaultValue: Sequelize.NOW
   },
   total: {
      type: DataTypes.VIRTUAL,
      get() {
         if(this.items.length > 0) {
            return this.items.reduce((total, item) => {
               return total + (item.price * item.OrderProduct.amount);
            }, 0);
         }
         return 0;
      }
   }
}

class Order extends Model {
   static associate(models) {
      this.belongsTo(models.Customer, {
         as: 'customer',
      });
      // relacion muchos a muchos(una order tiene muchos productos y muchos
      // productos puede estar en una order)
      this.belongsToMany(models.Product, {
         as: 'items',  // nombre de la asociacion
         through: models.OrderProduct, // se especifica la tabal pivote de la relacion n a n
         foreignKey: 'orderId', // se especifica la llave foranea
         otherKey: 'productId'  // se especifica la otra llave foranea de la taba pivote
      })
   }

   static config(sequelize) {
      return {
         sequelize,
         tableName: ORDER_TABLE,
         modelName: 'Order',
         timestamps: false,
      }
   }
}

module.exports = { ORDER_TABLE, OrderSchema, Order }
