const express = require('express')
const { getListUserLikeOfResID, getListUserRateOfResID } = require('../controllers/resControllers')
const resRouter = express.Router()

resRouter.get('/getListUserLikeOfResID/:res_id', getListUserLikeOfResID)

resRouter.get('/getListUserRateOfResID/:res_id', getListUserRateOfResID)

module.exports = resRouter