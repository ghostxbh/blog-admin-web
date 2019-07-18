const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const data = {
    common: (data) => {
        let {pageNum, pageSize, total, totalPage, cateList, list} = data;
        let template = fs.readFileSync(path.dirname(__filename) + '/type-list.ejs', 'utf8');
        let html = ejs.render(template, {pageNum, pageSize, total, totalPage, cateList, list});
        return html;
    }
};
module.exports = data.common;