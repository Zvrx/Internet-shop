const Router = require('express')
const router = new Router()
const typeConntroller = require('../controllers/TypeController')
const checkrole = require('../middleware/checkRoleMiddleware')
//checkrole('ADMIN')
router.post('/',typeConntroller.createType),
router.get('/',typeConntroller.GetAll)
router.post('/delete',typeConntroller.DeleteType)

module.exports = router