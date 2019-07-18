/**
 * Created by xbh 2019-07-16
 */
var express = require('express');
var router = express.Router();
const api = require('../../service/http-api');
const ui = require('../../views/ui/index');
router.get('/', function (req, res, next) {
    api.special.list()
        .then(data => {
            let special_list_html = ui.special.specialList(data.data);
            res.render('root', {
                layout: 'page/special/special-list',
                title: '专栏列表',
                special_list_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json([]);
        })
});

router.post('/create', function (req, res, next) {
    api.special.create(req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.post('/update/:id', function (req, res, next) {
    let {id} = req.params;
    api.special.update(id, req.body)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.get('/del/:id', function (req, res, next) {
    let {id} = req.params;
    api.special.delete(id)
        .then(data => res.json(data))
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

router.get('/add', function (req, res, next) {
    let special_add_html = ui.special.specialAdd();
    res.render('root', {
        layout: 'page/special/special-add',
        title: '新增专栏',
        special_add_html
    });
});

router.get('/:id', function (req, res, next) {
    let {id} = req.params;
    api.special.detail(id)
        .then(data => {
            let special = data.data;
            let special_info_html = ui.special.specialInfo(special);
            res.render('root', {
                layout: 'page/special/special-info',
                title: '专栏详情',
                special_info_html
            });
        })
        .catch(e => {
            console.log(e);
            res.json({});
        })
});

module.exports = router;