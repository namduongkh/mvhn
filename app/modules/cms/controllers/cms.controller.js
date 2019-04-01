'use strict';
import Glob from 'glob';
import fs from "fs";

exports.index = {
    handler: function (request, h) {
        return h.view('cms/views/index', {}, {
            layout: 'cms/layout'
        });
    },
    auth: false
};

exports.syncPlugins = {
    handler: function (request, h) {
        initCmsPlugins();
        return "Synced!";
    },
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    }
};

function initCmsPlugins() {
    const plugins = Glob.sync(BASE_PATH + '/app/modules/*/views/cms/index.js');
    let importContent = '';
    let exportContent = '';
    plugins.forEach((plugin) => {
        let pluginName = plugin.match(/\/app\/modules\/([^\/]+)\/views\/cms\/index.js/)[1];
        importContent += `import ${pluginName} from "${plugin}";\n`;
        exportContent += `\t${pluginName},\n`;
    });
    exportContent = `export default [\n${exportContent}]`;
    fs.writeFileSync(BASE_PATH + '/app/modules/cms/views/skin/routers/index.js', `${importContent}\n${exportContent}`);
}