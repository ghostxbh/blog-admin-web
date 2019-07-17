const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const data = {
    common: (data) => {
        let template = fs.readFileSync(path.dirname(__filename) + '/category-list.ejs', 'utf8');
        let html = ejs.render(template, {data});
        return html;
    }
};
module.exports = data.common;