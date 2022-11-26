const express = require('express')
const userRouter = express.Router()
const { getListLikeResOfUserID, getListRateResOfUserID, postRateRes, postLikeUnlikeRes, postOrder } = require('../controllers/userControllers')

userRouter.get('/getListLikeResOfUserID/:user_id', getListLikeResOfUserID)

userRouter.get('/getListRateResOfUserID/:user_id', getListRateResOfUserID)

userRouter.post('/likeUnlikeRes', postLikeUnlikeRes)

userRouter.post('/rateRes', postRateRes)

userRouter.post('/order', postOrder)

module.exports = userRouter