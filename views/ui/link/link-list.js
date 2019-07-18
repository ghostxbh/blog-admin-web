const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const data = {
    common: (data) => {
        let {status,pageNum, pageSize, total, totalPage, list} = data;
        let template = fs.readFileSync(path.dirname(__filename) + '/link-list.ejs', 'utf8');
        let html = ejs.render(template, {status,pageNum, pageSize, total, totalPage, list});
        return html;
    }
};
module.exports = data.common;