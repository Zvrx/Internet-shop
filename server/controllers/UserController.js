const ApiError = require('../Handler/ApiError')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const {User,Basket, Cart} = require('../models/models')
const { json } = require('sequelize')

const generateJwt = (id,email,role) =>{
    return JWT.sign({id: id, email,role},process.env.SECRET_KEY,{expiresIn: '24h'})
}

class UserController{
    async registration(req,res,next){
        const {email,password,role} = req.body
        if(!email || !password)
        {
            return next(ApiError.BadRequest('error'));
        }
        else{
            const candidate = await User.count({where: {email}})
            if(candidate>0)
            {
                return next(ApiError.BadRequest('уже существует'));
            }
            const hashPassword = await bcrypt.hash(password,5)
            const user = await User.create({email,role,password: hashPassword})
            const token = generateJwt(user.id,user.email,user.role)
            const cart = await Cart.create({ userId: user.id });
            console.log(user.id)
            return res.json({token})
        }

    }
    async login(req,res,next){  
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.BadRequest('Нет такого пользователя'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword)
        {
            return next(ApiError.BadRequest('Пароли не совпадают'))
        }
        const token = generateJwt(user.id,user.email,user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id,req.user.email,req.user.password,req.user.role)
        return res.json(token)
    }
}

module.exports = new UserController()