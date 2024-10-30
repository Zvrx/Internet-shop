require('dotenv').config()
const express = require('express')
const sequelize = require('../server/db.js')
const models = require('../server/models/models.js')
const PORT = process.env.PORT || 5000
const app = express()
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHanddlingMiddleware')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(fileupload({}))
app.use('/api',router)
app.use(express.static(path.resolve(__dirname,'static')))
//
app.use(errorHandler)

/**app.get('/',(req,res) => {
    res.status(200).json({message: 'Working'})
}) */

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log('Сервер  запущен на порте '+ PORT))
    } catch (e) {
        console.log(e)
    }
 
}

start()