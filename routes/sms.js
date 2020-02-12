/**
 * @author ghostxbh
 * @date 2020/2/12
 * @description
 */
var express = require('express');
var router = express.Router();

router.get('/callback.action', function (req, res, next) {
    const params = req.params;
    const header = req.headers;
    const query = req.query;
    console.log('GET params: ', params);
    console.log('GET header: ', header);
    console.log('GET query: ', query);
    res.status(200).send('delivrd');
});

router.post('/callback.action', function (req, res, next) {
    const param = req.body;
    console.log('post: ', param);
    res.status(200).send('delivrd');
});

module.exports = router;
