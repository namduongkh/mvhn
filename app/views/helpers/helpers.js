const Handlebars = require('handlebars');
const fs = require('fs');

const helpers = {
    versionResource: function(src) {
        if (src.indexOf('http') == -1) {
            var stats = fs.statSync(`${BASE_PATH}/public${src}`);
            // console.log("BASE_PATH", BASE_PATH);
            var myDate = new Date(stats.mtime);
            var result = myDate.getTime() / 1000;
            return `${src}?v=${result}`;
        }
        return src;
    },
    json: function(context) {
        return JSON.stringify(context);
    },
    active_menu: function(active_menu, menu) {
        if (active_menu == menu) {
            return "active";
        }
        return "";
    },
};

for (let key in helpers) {
    Handlebars.registerHelper(key, helpers[key]);
}
module.exports = {};