import Glob from "glob";
import moment from "moment";
import mongoose from "mongoose";
import fs from "fs";
import fsExtra from "fs-extra";
import _ from "lodash";
import Util from "./util";

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

function fieldType(field, key) {
  if (!field.type && !field[0]) {
    field = { type: String };
  }
  switch (field.type || field[0].type) {
    case String:
      if (/image|thumb|img/.test(key)) {
        if (Array.isArray(field)) return 'images';
        return 'image';
      }
      if (/content|description/.test(key)) return 'editor';
      return "text";
    case Date:
      return "date";
    case Number:
      return "text";
    case Boolean:
      return "checkbox";
    case Object:
      return "json_editor";
    case mongoose.Schema.Types.ObjectId:
      return "select2";
  }
}

function fieldStructure(field, key) {
  let type = fieldType(field, key);
  let typeNote = ((type) => {
    switch (type) {
      case 'text':
        return '// select, textarea, editor, image, images, json_editor';
      case 'editor':
        return '// textarea, json_editor';
      default:
        return '';
    }
  })(type);

  let structure = `
    "label": "${_.snakeCase(key).split('_').map((w) => { return _.capitalize(w) }).join(' ')}",
    "type": "${type}", ${typeNote}
    "list": true, // show on list page
  `
  if (field.ref || (field[0] && field[0].ref)) {
    structure += `\n"ref": "${((field.ref || (field[0] && field[0].ref)).toLowerCase() + 's').replace(/ys$/, 'ies')}",`;
  }

  if (type == "date") {
    structure += `\n"timePicker": true,`;
  }

  return structure;
}

function run() {
  return new Promise(async (rs, rj) => {
    let folderName = process.argv[2] || await Util.inputRequest('Plugin folder name: ');
    if (!folderName) return rs('-- Please provide the folder name.');

    Util.connectMongoDB();
    let modelName = (process.argv[3] || await Util.inputRequest('Model name: '));
    if (!modelName || !mongoose.models[modelName]) return rs(`-- Model ${modelName} doesn't exists!`);
    const Model = mongoose.model(modelName);

    let folderPath = Util.Path.plugin(folderName);
    let cmsFolderPath = folderPath + '/views/cms';

    if (!fs.existsSync(folderPath)) return rs('-- The plugin doesn\'t exists!');
    if (!fs.existsSync(folderPath + '/views')) {
      fs.mkdirSync(folderPath + '/views');
    }
    if (!fs.existsSync(cmsFolderPath)) {
      fs.mkdirSync(cmsFolderPath);
    }
    if (!fs.existsSync(cmsFolderPath + '/structure.js')) {
      fs.writeFileSync(`${cmsFolderPath + '/structure.js'}`, await Util.renderTemplate('./templates/cms-plugin/structure.js.ejs', {
        fields: Model.schema.obj,
        fieldStructure
      }));
      console.log(`Generated ${cmsFolderPath + '/structure.js'}, please modify this file and run again`);
      return rs();
    }

    const formInfo = (await require(cmsFolderPath + '/structure.js')).default;

    if (fs.existsSync(cmsFolderPath + '/index.js')) {
      fsExtra.moveSync(cmsFolderPath, folderPath + '/views/cms-bak/' + moment().format('YYYYMMDDhhmm'), { overwrite: true });
      console.log('Moved existing cms folder to cms backup folder.');
    }

    fsExtra.mkdirpSync(cmsFolderPath);
    fsExtra.mkdirpSync(cmsFolderPath + '/components');

    let data = {
      name: folderName,
      modelName: modelName,
      pluralName: (folderName + 's').replace(/ys$/, 'ies'),
      pluralNameCap: Util.removeLodashAndCapitalize((folderName + 's').replace(/ys$/, 'ies'), ' '),
      fields: Model.schema.obj,
      capitalize: _.capitalize,
      formInfo
    }

    fs.writeFileSync(`${cmsFolderPath + '/index.js'}`, await Util.renderTemplate('./templates/cms-plugin/index.js', data));
    fs.writeFileSync(`${cmsFolderPath + '/components/List.vue'}`, await Util.renderTemplate('./templates/cms-plugin/components/List.vue', data));
    fs.writeFileSync(`${cmsFolderPath + '/components/fields.js'}`, await Util.renderTemplate('./templates/cms-plugin/components/fields.js', data));
    fs.writeFileSync(`${cmsFolderPath + '/components/Detail.vue'}`, await Util.renderTemplate('./templates/cms-plugin/components/Detail.vue', data));

    rs();
  });
}
