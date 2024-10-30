const sequelize = require('../db')
const {datatypes} = require('sequelize')
const { Model, DataTypes, Deferrable } = require("sequelize");

const User = sequelize.define('user',
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    email: {type: DataTypes.STRING,unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING,defaultValue: "USER"},
});

const Basket = sequelize.define('Basket',
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING,allowNull: true},
    price: {type: DataTypes.FLOAT,allowNull: true},
    amount: {type: DataTypes.INTEGER,allowNull: true}
});

const Basket_dye = sequelize.define('Basket_dye',
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
});

const Dye = sequelize.define('Dye',
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING,allowNull: false},
    price: {type: DataTypes.FLOAT,allowNull: false},
    description: {type: DataTypes.TEXT,allowNull: true},
    rating: {type: DataTypes.FLOAT,defaultValue: 0},
    ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: {type: DataTypes.STRING,allowNull: false}
});

const Type = sequelize.define('Type',
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING,unique: true,allowNull: false},
});

const Brand = sequelize.define('Brand',
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    name: {type: DataTypes.STRING,unique: true,allowNull: false},
});

const DyeInfo = sequelize.define('DyeInfo',
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    title: {type: DataTypes.STRING,unique: true,allowNull: false},
    description: {type: DataTypes.STRING,unique: true,allowNull: false},
});

const TypeBrand = sequelize.define('TypeBrand',
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
});
const rating = sequelize.define('rating',
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    rate: {type: DataTypes.INTEGER}
});
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  productIds: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'принят на рассмотрение'
  },
  devilery: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'самовывоз'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'наличные'
  },
  orderIdentifier: {
    type: DataTypes.VIRTUAL,
    get() {
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      return `${date}${this.id}`;
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'неизвестен'
  },
});
const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
    
}

);
Cart.prototype.getDyes = async function () {
    const dyes = await this.getDye(); // assuming the association name is "Dye"
    return dyes;
  };

Cart.belongsTo(User);
User.hasMany(Cart);

// Cart belongs to Product
Cart.belongsTo(Dye);
Dye.hasMany(Cart);

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(rating)
rating.belongsTo(User)

Basket.hasMany(Basket_dye)
Basket_dye.belongsTo(Basket)

Dye.belongsTo(Type);
Dye.belongsTo(Brand);
Type.hasMany(Dye);
Brand.hasMany(Dye);

Dye.hasMany(Basket_dye)
Basket_dye.belongsTo(Dye)

Dye.hasMany(DyeInfo, {as: 'info'})
DyeInfo.belongsTo(Dye)

Type.belongsToMany(Brand,{through: TypeBrand})
Brand.belongsToMany(Type,{through: TypeBrand})

module.exports = {
    User,
    Basket,
    Basket_dye,
    Dye,
    DyeInfo,
    Type,
    Brand,
    Cart,
    TypeBrand,
    Order
}