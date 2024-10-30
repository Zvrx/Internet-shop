const {Dye, Cart, User,Order} = require('../models/models')
const {Brand} = require('../models/models')
const {Type} = require('../models/models')
const ApiError = require('../Handler/ApiError');
const { Sequelize,Op,where,literal } = require('sequelize');

class OrderController{
    async OrderDye(req,res)
    {
      try {
        const { customerName, customerEmail, totalQuantity, totalPrice, productIds,status,devilery,paymentMethod,orderIdentifier,phone } = req.body;
        
        // Создание нового заказа в базе данных
        const order = await Order.create({
          customerName,
          customerEmail,
          totalQuantity,
          totalPrice,
          productIds,
          status,
          devilery,
          paymentMethod,
          orderIdentifier,
          phone
        });
    
        res.status(201).json({ success: true, order });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to create order' });
      }
    };
    async GetUserOrders(req,res)
    {
      try {
        const { customerEmail } = req.query;
    
        // Поиск всех заказов пользователя по его email
        const userOrders = await Order.findAll({
          where: {
            customerEmail,
          },
        });
    
        res.status(200).json({ success: true, orders: userOrders });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to get user orders' });
      }
    };
    async GetAllOrders(req, res) {
      try {
        // Получение всех заказов
        const allOrders = await Order.findAll();
    
        res.status(200).json({ success: true, orders: allOrders });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to get all orders' });
      }
    }
    async EditOrder(req, res) {
      const { orderId, newStatus } = req.body;

      try {
        // Находим заказ с указанным id
        const order = await Order.findByPk(orderId);
      
        if (!order) {
          return res.status(404).json({ success: false, error: 'Order not found' });
        }
      
        // Обновляем статус заказа
        order.status = newStatus;
        await order.save();
      
        return res.status(200).json({ success: true, message: 'Order status updated successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Failed to update order status' });
      }
    }
    async DeleteOrder(req, res) {
      const { orderId } = req.body; // Получение ID заказа из тела запроса
      
      try {
        // Удаление заказа из базы данных по ID
        await Order.destroy({ where: { id: orderId } });
      
        res.status(200).json({ success: true, message: 'Order deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to delete order' });
      }
    }
}

module.exports = new OrderController()