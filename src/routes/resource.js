const router = require('express').Router();
const {displayResourceController} = require('../controllers/resource')


router.get('/',displayResourceController.showIndex);

module.exports = router;