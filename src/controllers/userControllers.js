const sequelize = require('../models/index')
const initModels = require('../models/init-models')
const models = initModels(sequelize)
const { successCode, errCode, failCode } = require("../configs/reponse")

const getListLikeResOfUserID = async (req, res) => {
   try {
      const { user_id } = req.params
      const data = await models.user.findOne({
         where: { user_id },
         include: ['list_restaurants_like']
      })
      if (data) {
         successCode(res, data, 'Lấy thành công')
      } else {
         failCode(res, data, 'Người dùng không tồn tại')
      }
   } catch (err) {
      errCode(res, 'Lỗi BE')
   }
}

const getListRateResOfUserID = async (req, res) => {
   try {
      const { user_id } = req.params
      const data = await models.user.findOne({
         where: { user_id },
         include: ['list_restaurants_rate']
      })

      if (data) {
         successCode(res, data, 'Lấy thành công')
      } else {
         failCode(res, data, 'Người dùng không tồn tại')
      }
   } catch (err) {
      errCode(res, 'Lỗi BE')
   }
}

const postLikeUnlikeRes = async (req, res) => {
   try {
      const { user_id, res_id, date_like } = req.body
      const checkUser = await models.user.findOne({
         where: user_id
      })
      const checkRes = await models.restaurant.findOne({
         where: res_id
      })
      const listLike = await models.like_res.findAll({
         where: user_id
      })
      const checkLike = listLike.find(like => like.res_id === res_id)

      if (checkUser) {
         if (checkRes) {
            if (!checkLike) {
               const data = await models.like_res.create({ user_id, res_id, date_like })
               successCode(res, data, 'like thành công')
            } else {
               await checkLike.destroy()
               successCode(res, checkLike, 'unlike thành công')
            }
         } else {
            failCode(res, checkRes, 'Nhà hàng không tồn tại')
         }
      } else {
         failCode(res, checkUser, 'Người dùng không tồn tại')
      }
   } catch (err) {
      errCode(res, 'Lỗi BE')
   }
}

const postRateRes = async (req, res) => {
   try {
      const { user_id, res_id, amount, date_rate } = req.body
      const checkUser = await models.user.findOne({
         where: user_id
      })
      const checkRes = await models.restaurant.findOne({
         where: res_id
      })
      const listRate = await models.rate_res.findAll({
         where: user_id
      })
      const checkRate = listRate.find(rate => rate.res_id === res_id)

      if (checkUser) {
         if (checkRes) {
            if (amount >= 0 && amount <= 5) {
               if (!checkRate) {
                  const data = await models.rate_res.create({ user_id, res_id, amount, date_rate })
                  successCode(res, data, 'đánh giá thành công')
               } else {
                  const data = await checkRate.update({ amount, date_rate })
                  successCode(res, data, 'đánh giá thành công')
               }
            } else {
               failCode(res, '', 'Đánh giá phải từ 0 đến 5')
            }
         } else {
            failCode(res, checkRes, 'Nhà hàng không tồn tại')
         }
      } else {
         failCode(res, checkUser, 'Người dùng không tồn tại')
      }
   } catch (err) {
      errCode(res, 'Lỗi BE')
   }
}

const postOrder = async (req, res) => {
   try {
      const { user_id, food_id, amount, code, arr_sub_id } = req.body
      const checkUser = await models.user.findOne({
         where: user_id
      })
      const checkFood = await models.food.findOne({
         where: food_id
      })
      const listOrder = await models.order.findAll({
         where: user_id
      })
      const checkOrder = listOrder.find(order => order.food_id === food_id)

      if (checkUser) {
         if (checkFood) {
            if (amount > 0) {
               if (!checkOrder) {
                  const data = await models.order.create({ user_id, food_id, amount, code, arr_sub_id })
                  successCode(res, data, 'order thành công')
               } else {
                  const data = await checkOrder.update({ amount, code, arr_sub_id })
                  successCode(res, data, 'order thành công')
               }
            } else {
               failCode(res, '', 'Số lượng phải lớn hơn 0')
            }
         } else {
            failCode(res, checkFood, 'Food không tồn tại')
         }
      } else {
         failCode(res, checkUser, 'Người dùng không tồn tại')
      }
   } catch (err) {
      errCode(res, 'Lỗi BE')
   }
}

module.exports = { getListLikeResOfUserID, getListRateResOfUserID, postLikeUnlikeRes, postRateRes, postOrder }