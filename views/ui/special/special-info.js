const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const data = {
    common: (special) => {
        let template = fs.readFileSync(path.dirname(__filename) + '/special-info.ejs', 'utf8');
        let html = ejs.render(template, {special});
        return html;
    }
};
module.exports = data.common;