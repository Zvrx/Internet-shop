const Router = require('express')
const router = new Router()
const UserRouter = require('./UserRoutes')
const BrandRouter = require('./BrandRoutes')
const TypeRouter = require('./typeRoutes')
const DyeRouter = require('./DyeRoutes')
const CartRouter = require('./CartRoutes')
const OrderRoutes = require('./OrderRoutes')

router.use('/user',UserRouter)
router.use('/type',TypeRouter)
router.use('/brand',BrandRouter)
router.use('/Dye',DyeRouter)
router.use('/Basket',CartRouter)
router.use('/Order',OrderRoutes)

module.exports = router