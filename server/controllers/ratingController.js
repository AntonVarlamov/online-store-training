const {Device, Rating} = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
  async rate(req, res) {
   let {userId, deviceId, rate} = req.body;
    await Rating.findOrCreate({where:{userId, deviceId, rate:0}});
    const rating = await Rating.update({rate}, {where: {userId, deviceId}})
    res.json(rating)
  }
  async getRating(req, res) {
    let {deviceId} = req.query;
    const allRating = await Rating.findAll({where: {deviceId}});
    let total = 0;
    for (let i = 0; i < allRating.length; i++) {
      total += +allRating[i].rate
    }
    return res.json(total / allRating.length)
  }
}

module.exports = new RatingController()