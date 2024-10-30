const Router = require('express')
const UserController = require('../controllers/Usercontroller')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',UserController.registration),
router.post('/login',UserController.login)
router.get('/auth',authMiddleware,UserController.check)

module.exports = router