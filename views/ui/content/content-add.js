const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const data = {
    common: (data) => {
        let {treeList, specialList} = data;
        let template = fs.readFileSync(path.dirname(__filename) + '/content-add.ejs', 'utf8');
        let html = ejs.render(template, {treeList, specialList});
        return html;
    }
};
module.exports = data.common;