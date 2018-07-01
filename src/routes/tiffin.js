const router = require('express').Router();
const {
    showIndex,
    fetch,
    show
} = require('../controllers/tiffin')
const { isAuth} = require('../middlewares')
const {
    showTiffinCart
} = require('../controllers/cart')
const {
    isLocation
} = require('../middlewares')

router.get('/:city/:state',show);
router.get('/:limit/get/:city/:state',isLocation,fetch);
router.get('/checkout/:productID/:subscriptionID',isAuth,showTiffinCart);


module.exports = router;