const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const data = {
    common: () => {
        let template = fs.readFileSync(path.dirname(__filename) + '/special-add.ejs', 'utf8');
        let html = ejs.render(template);
        return html;
    }
};
module.exports = data.common;