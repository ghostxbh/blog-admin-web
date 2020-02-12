/**
 * @author ghostxbh
 * @date 2020/2/12
 * @description
 */
var express = require('express');
var router = express.Router();

router.post('/callback.action', function (req, res, next) {
    const param = req.body || req.params;
    console.log(param);
    res.status(200).send('delivrd');
});

module.exports = router;
