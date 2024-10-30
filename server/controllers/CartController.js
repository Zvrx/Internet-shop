const {Dye, Cart, User,Order} = require('../models/models')
const {Brand} = require('../models/models')
const {Type} = require('../models/models')
const ApiError = require('../Handler/ApiError');
const { Sequelize,Op,where,literal } = require('sequelize');
class CartController{

    async getAll(req,res){
        const userMail = req.query.userMail;
        // Find cart by ID
        console.log(userMail)
        const user = await User.findOne({where:{email:userMail}})
        const userId = user.id
        const dyesInCart = await Cart.findAll({
            where: { userId: userId },
            include: [
              {
                model: Dye,
                include: [
                  {
                    model: Type,
                    attributes: ["name"], // включаем только название типа
                    required: false
                  },
                  {
                    model: Brand,
                    attributes: ["name"], // включаем только название бренда
                    required: false,
                    where: { id: { [Op.ne]: null } } // исключаем записи Brand со значением id = null
                  },
                ],
              },
            ],
          });
          const dyes = dyesInCart.map((item) => {
            if (item.Dye) {
              const dye = item.Dye.toJSON();
              return { ...dye, quantity: item.quantity };
            }
            return null;
          }).filter((item) => item !== null);
          return res.json({ userId: userId, dyes: dyes });
    }
    async DeleteDye(req,res)
    {
      const { UserId,DyeId } = req.body;

      const deletedDye = await Cart.destroy({
        where: {
          userId: UserId,
          DyeId: DyeId,
        },
      });
      
      if (!deletedDye) {
        return res.status(404).json({ error: 'Dye not found in cart' });
      }
      
      return res.json(deletedDye);
    }
    async GetOne(req,res)
    {
        const {id} = req.params
        const dye = await Dye.findOne({
            where: {id},
            include: [{model: DyeInfo, as: 'info'},]
        }
        
        )    
        return res.json(dye)
    }
    async OrderDye(req,res)
    {
      try {
        const { customerName, customerEmail, totalQuantity, totalPrice, productIds } = req.body;
    
        // Создание нового заказа в базе данных
        const order = await Order.create({
          customerName,
          customerEmail,
          totalQuantity,
          totalPrice,
          productIds
        });
    
        res.status(201).json({ success: true, order });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to create order' });
      }
    };
}

module.exports = new CartController()