const Router = require('express')
const router = new Router()
const BrandConntroller = require('../controllers/BrandContoller')

router.post('/',BrandConntroller.createBrand),
router.get('/',BrandConntroller.getBrand),
router.post('/delete',BrandConntroller.DeleteBrand)

module.exports = router