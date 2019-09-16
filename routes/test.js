/**
 * Created by xbh 2019-08-09
 */
var router = require('express').Router();
var data = require('../conf/test')

router.get('/', async function (req, res, next) {

    res.json(data);
})

module.exports = router;