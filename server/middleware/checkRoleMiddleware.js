const JWT = require('jsonwebtoken')
const { fn } = require('sequelize')

module.exports = function(role){
    return function(req,res,next){
        if(req.method ==="OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                res.status(401).json({message:"токен"})
            }
            const decoded = JWT.verify(token,process.env.SECRET_KEY)
            if(decoded.role !== role)
            {
                res.status(483).json({message: 'нет доступа'})
            }
            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json({message: 'ошибка'})
        }
    }
}
fn('ADMIN')