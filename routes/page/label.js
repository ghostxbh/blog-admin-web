/**
 * Created by xbh 2019-07-17
 */
var express = require('express');
var router = express.Router();
const api = require('../../service/http-api');
const ui = require('../../views/ui/index');
router.get('/', function (req, res, next) {
    let {pageNum, pageSize} = req.query;
    if (!pageNum && !pageSize) {
        pageNum = 1;
        pageSize = 10;
    }
    api.label.list(pageNum, pageSize)
        .then(data => {
            let label_list_html = ui.label(data.data);
            res.render('root', {
                layout: 'page/label',
                title: '标签列表',
                label_list_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.post('/add', function (req, res, next) {
    api.label.create(req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    api.label.update(id, req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.get('/del/:id', function (req, res, next) {
    let {id} = req.params;
    api.label.delete(id)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});
module.exports = router;