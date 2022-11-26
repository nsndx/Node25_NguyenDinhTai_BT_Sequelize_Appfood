const express = require('express')
const rootRouter = express.Router()

const resRouter = require('./resRouters')
const userRouter = require('./userRouter')

rootRouter.use('/users', userRouter)

rootRouter.use('/res', resRouter)

module.exports = rootRouter