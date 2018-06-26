const router = require('express').Router();
const {displayServiceController} = require('../controllers/service')


router.get('/',displayServiceController.showIndex);

module.exports = router;