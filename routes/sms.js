/**
 * @author ghostxbh
 * @date 2020/2/12
 * @description
 */
var express = require('express');
var router = express.Router();

router.get('/callback.action', function (req, res, next) {
    const param = req.params || req.header.params;
    console.log('get: ', param);
    console.log('get req: ', req);
    res.status(200).send('delivrd');
});

router.post('/callback.action', function (req, res, next) {
    const param = req.body;
    console.log('post: ', param);
    console.log('post req: ', req);
    res.status(200).send('delivrd');
});

module.exports = router;
