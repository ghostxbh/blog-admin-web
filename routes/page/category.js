/**
 * Created by xbh 2019-07-16
 */
var express = require('express');
var router = express.Router();
const api = require('../../service/http-api');
const ui = require('../../views/ui/index');
router.get('/', function (req, res, next) {
    api.category.list()
        .then(data => {
            let category_list_html = ui.category(data.data);
            res.render('root', {
                layout: 'page/category',
                title: '分类列表',
                category_list_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.post('/add', function (req, res, next) {
    api.category.create(req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    api.category.update(id, req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.get('/del/:id', function (req, res, next) {
    let {id} = req.params;
    api.category.delete(id)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

module.exports = router;