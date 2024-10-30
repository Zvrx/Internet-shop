const {Type} = require('../models/models')
const ApiError = require('../Handler/ApiError')

class TypeController{
    async createType(req,res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async GetAll(req,res){
        const types = await Type.findAll()
        return res.json(types)
    }
    async DeleteType(req, res) {
        const TypeName = req.body.TypeName;
      
        try {
          const deletedType = await Type.destroy({ where: { name: TypeName } });
      
          if (deletedType === 0) {
            return res.status(404).json({ error: `Type with name ${TypeName} not found` });
          }
      
          return res.status(200).json({ message: `Type with name ${TypeName} has been deleted` });
        } catch (error) {
          return res.status(500).json({ error: `Type error: ${error.message}` });
        }
      }
}

module.exports = new TypeController()