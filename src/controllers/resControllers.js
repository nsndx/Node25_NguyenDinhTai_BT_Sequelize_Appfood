const sequelize = require('../models/index')
const initModels = require('../models/init-models')
const models = initModels(sequelize)
const { successCode, errCode, failCode } = require("../configs/reponse")

const getListUserLikeOfResID = async (req, res) => {
   try {
      const { res_id } = req.params
      const data = await models.restaurant.findOne({
         where: { res_id },
         include: ['list_users_like']
      })

      if (data) {
         successCode(res, data, 'Lấy thành công')
      } else {
         failCode(res, data, 'Nhà hàng không tồn tại')
      }
   } catch (err) {
      errCode(res, 'Lỗi BE')
   }
}
const getListUserRateOfResID = async (req, res) => {
   try {
      const { res_id } = req.params
      const data = await models.restaurant.findOne({
         where: { res_id },
         include: ['list_users_rate']
      })

      if (data) {
         successCode(res, data, 'Lấy thành công')
      } else {
         failCode(res, data, 'Nhà hàng không tồn tại')
      }
   } catch (err) {
      errCode(res, 'Lỗi BE')
   }
}

module.exports = { getListUserLikeOfResID, getListUserRateOfResID }