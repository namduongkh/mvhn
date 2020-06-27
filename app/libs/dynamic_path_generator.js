const Glob = require('glob');
const fs = require('fs');

export default class DynamicPathGenerator {
  constructor(BASE_PATH) {
    this.BASE_PATH = BASE_PATH;
    this.pathFolder = BASE_PATH + '/app/libs/paths';
    if (!fs.existsSync(this.pathFolder)) fs.mkdirSync(this.pathFolder);
  }

  perform() {
    this.loadModelPaths();
    this.loadPluginPaths();
  }

  loadModelPaths() {
    let importScript = '';
    let exportScript = '';

    Glob.sync(this.BASE_PATH + '/app/plugins/*/models/*.js', {}).forEach((item) => {
      let matcher = item.match(/plugins\/([^\/]+)\/models\/(.+)\.js/);
      let pluginName = matcher[1];
      let modelName = matcher[2];
      importScript += `import ${modelName.replace(/\./g, '_')} from '@plugins/${pluginName}/models/${modelName}.js';\n`;
      exportScript += `${modelName.replace(/\./g, '_')},\n`;
    });

    Glob.sync(this.BASE_PATH + '/app/db/text_searchs/*.js', {}).forEach((item) => {
      let matcher = item.match(/text_searchs\/(.+)\.js/);
      let modelName = matcher[1];
      importScript += `import ${modelName.replace(/\./g, '_')} from '@root/app/db/text_searchs/${modelName}.js';\n`;
      exportScript += `${modelName.replace(/\./g, '_')},\n`;
    });

    fs.writeFileSync(this.pathFolder + '/models.js', `
    ${importScript}

    export default {
      ${exportScript}
    }
  `);
  }

  loadPluginPaths() {
    let importScript = '';
    let exportScript = '';

    let files = Glob.sync(this.BASE_PATH + '/app/plugins/*/index.js', {});
    files.forEach((item) => {
      let matcher = item.match(/plugins\/([^\/]+)\/index\.js/);
      let pluginName = matcher[1];
      importScript += `import ${pluginName} from '@plugins/${pluginName}/index.js';\n`;
      exportScript += `${pluginName},\n`;
    });

    fs.writeFileSync(this.pathFolder + '/plugins.js', `
    ${importScript}

    export default {
      ${exportScript}
    }
  `);
  }
}
