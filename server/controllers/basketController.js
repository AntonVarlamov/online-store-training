const {BasketDevice, Device, Basket} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async add(req, res, next) {
    try {
      let {userId, deviceId} = req.body;
      const basket = await Basket.findOne({where: {userId}})
      const basketDevice = await BasketDevice.create({
        deviceId,
        basketId: basket.id
      })
      return res.json(basketDevice)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let {userId} = req.query;
    const basket = await Basket.findOne({where: {userId}})
    const basketDevices = await BasketDevice.findAll({where: {basketId: basket.id}})
    const devices = []
    for (let i = 0; i < basketDevices.length; i++) {
      devices[i] = await Device.findOne({where: {id: basketDevices[i].deviceId}})
    }
    return res.json(devices)
  }

  async check(req, res) {
    let {deviceId, userId} = req.query;
    const basket = await Basket.findOne({where: {userId}})
    return res.json(await BasketDevice.findOne({where: {deviceId, basketId: basket.id}}))
  }
}

module.exports = new BasketController()
