/**
 * Created by xbh 2019-07-17
 */
var express = require('express');
var router = express.Router();
const api = require('../../service/http-api');
const ui = require('../../views/ui/index');
router.get('/', function (req, res, next) {
    let {status, pageNum, pageSize} = req.query;
    status = status && status!='0' ? status : '';
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 10;
    api.link.list(status, pageNum, pageSize)
        .then(data => {
            let link_list_html = ui.link(data.data);
            res.render('root', {
                layout: 'page/link',
                title: '标签列表',
                link_list_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json({});
        })
});


router.post('/add', function (req, res, next) {
    api.link.create(req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    api.link.update(id, req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.get('/del/:id', function (req, res, next) {
    let {id} = req.params;
    api.link.delete(id)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});
module.exports = router;