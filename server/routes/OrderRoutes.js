const Router = require('express')
const router = new Router()
const OrderController = require("../controllers/OrderController")

router.post('/add',OrderController.OrderDye)
router.get('/',OrderController.GetUserOrders)
router.get('/all',OrderController.GetAllOrders)
router.post('/delete',OrderController.DeleteOrder)
router.post('/edit',OrderController.EditOrder)

module.exports = router