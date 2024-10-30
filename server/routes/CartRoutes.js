const Router = require('express')
const router = new Router()
const CartController = require('../controllers/CartController')

router.get('/',CartController.getAll)
router.post('/delete',CartController.DeleteDye)
router.post('/order',CartController.OrderDye)

module.exports = router