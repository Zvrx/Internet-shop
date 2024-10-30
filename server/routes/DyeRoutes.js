const Router = require('express')
const router = new Router()
const DyeConntroller = require('../controllers/DyeController')

router.post('/',DyeConntroller.Create),
router.get('/',DyeConntroller.getAll)
router.get('/:id',DyeConntroller.GetOne)
router.post('/:id/add',DyeConntroller.AddDye),
router.post('/delete',DyeConntroller.DeleteDye),
router.post('/edit',DyeConntroller.EditDye),
router.post('/:id/AddRating',DyeConntroller.AddRating)

module.exports = router