const {Dye, Cart, User} = require('../models/models')
const {DyeInfo} = require('../models/models')
const ApiError = require('../Handler/ApiError')
const uid = require('uuid')
const { UUID, FLOAT } = require('sequelize')
const path = require('path')

class DyeController{

    async Create(req,res,next){
        try {
            const {name,price,description,BrandId,TypeId} = req.body
            const {img} = req.files
            console.log(TypeId,BrandId)
            let filename = uid.v4() + ".jpg"
            img.mv(path.resolve(__dirname,'..','static',filename))
            const dye = await Dye.create({name,price,img: filename,BrandId,TypeId,description})
            return res.json(dye)
        } catch (error) {
            console.log(error.message)
           next(ApiError.BadRequest(error.message))
        }
    }
    async AddDye (req, res){
        try {
          const { quantity, userMail, DyeId } = req.body;
          const user = await User.findOne({ where: { email: userMail } });
          const userId = user.id;
          const cart = await Cart.findOne({ where: { userId: userId } });
          const dye = await Dye.findByPk(DyeId);
          if (!cart) {
            return res.status(404).json({ error: "Корзина пользователя не найдена" });
          }
          if (!dye) {
            return res.status(404).json({ error: "Товар не найден" });
          }
          const existingDye = await Cart.findOne({ where: { userId: userId, DyeId: DyeId } });
          if (existingDye) {
            console.log(typeof existingDye.quantity);
            existingDye.quantity += parseInt(quantity);
            await existingDye.save();
          } else {
            await Cart.create({ quantity, userId, DyeId });
          }
            const dyesInCart = await Cart.findAll();
            return res.status(201).json({ message: dyesInCart });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            };
    async getAll(req,res){
        let {brandId,typeId,limit,page} = req.query
        page = page || 1
        limit = limit || 1000000000
        let offset = page * limit - limit
        let dyes;
        if(!brandId && !typeId)
        {
            dyes = await Dye.findAndCountAll({limit,offset})
        }
        else if (brandId && !typeId)
        {
            dyes = await Dye.findAndCountAll({where:{brandId},limit,offset})
        }
        else if (!brandId && typeId)
        {
            dyes = await Dye.findAndCountAll({where:{typeId},limit,offset})
        }
        else if (brandId && typeId)
        {
            dyes = await Dye.findAndCountAll({where:{brandId,brandId},limit,offset})
        }
        return res.json(dyes)
    }
    async GetOne(req,res)
    {
        const {id} = req.params
        const dye = await Dye.findOne({
            where: {id},
            include: [{model: DyeInfo, as: 'info'}]
        }
        
        )    
        return res.json(dye)
    }
    async AddRating(req,res)
    {
      const { id } = req.params;
      const { newRating } = req.body;
      console.log(newRating)
      try {
        // Получение краски по идентификатору
        const dye = await Dye.findByPk(id);
    
        if (!dye) {
          return res.status(404).json({ error: 'Товар не найден' });
        }
    
        // Получение общего количества голосов и текущего рейтинга
        const totalVotes = dye.ratingCount;
        const currentRating = dye.rating;
        
        // Рассчитываем новый рейтинг
        const newTotalVotes = totalVotes + 1;
        const newRatingSum = currentRating * totalVotes + newRating;
        const newAverageRating = newRatingSum / newTotalVotes;
        const roundedRating = parseFloat(newAverageRating.toFixed(2));
        
        // Обновляем рейтинг и количество голосов
        await dye.update({
          rating: roundedRating,
          ratingCount: newTotalVotes,
        });
    
        return res.status(200).json({ rating: roundedRating });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }
    }
    async EditDye(req,res)
    {try {
      const { id, name, price, description, BrandId, TypeId } = req.body;
      const dye = await Dye.findByPk(id);
  
      if (!dye) {
        return next(ApiError.NotFound('Dye not found'));
      }
  
      const oldImage = dye.img;
      let newImage;
  
      if (req.files && req.files.img) {
        const { img } = req.files;
        newImage = uid.v4() + '.jpg';
        await img.mv(path.resolve(__dirname, '..', 'static', newImage));
      }
  
      await dye.update({
        name: name || dye.name,
        price: price || dye.price,
        description: description || dye.description,
        BrandId: BrandId || dye.BrandId,
        TypeId: TypeId || dye.TypeId,
        img: newImage || dye.img,
      });
  
      if (newImage && oldImage) {
        fs.unlinkSync(path.resolve(__dirname, '..', 'static', oldImage));
      }
  
      return res.json(dye);
    } catch (error) {
      console.error(error.message);
      next(ApiError.BadRequest(error.message));
    }
    }
    async DeleteDye(req, res) {
        const DyeName = req.body.DyeName;
      
        try {
          const deletedDye = await Dye.destroy({ where: { name: DyeName } });
      
          if (deletedDye === 0) {
            return res.status(404).json({ error: `Type with name ${DyeName} not found` });
          }
      
          return res.status(200).json({ message: `Type with name ${DyeName} has been deleted` });
        } catch (error) {
          return res.status(500).json({ error: `Type error: ${error.message}` });
        }
      }
}

module.exports = new DyeController()