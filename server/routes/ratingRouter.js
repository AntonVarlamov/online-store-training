const Router = require('express');
const router = new Router;
const ratingRouter = require('../controllers/ratingController')

router.post('/', ratingRouter.rate)
router.get('/', ratingRouter.getRating)


module.exports = router;