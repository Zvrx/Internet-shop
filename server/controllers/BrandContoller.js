const {Brand} = require('../models/models')
const ApiError = require('../Handler/ApiError')

class BrandController{
    async createBrand(req,res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }
    async getBrand(req,res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async DeleteBrand(req, res) {
        const brandName = req.body.brandName;
      
        try {
          const deletedBrand = await Brand.destroy({ where: { name: brandName } });
      
          if (deletedBrand === 0) {
            return res.status(404).json({ error: `Brand with name ${brandName} not found` });
          }
      
          return res.status(200).json({ message: `Brand with name ${brandName} has been deleted` });
        } catch (error) {
          return res.status(500).json({ error: `Server error: ${error.message}` });
        }
      }
    }
module.exports = new BrandController()