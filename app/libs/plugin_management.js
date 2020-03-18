import mongoose from "mongoose";
import _ from "lodash";

export default class PluginManagementLib {
  static getInstance() {
    if (!this.instance) {
      this.instance = new PluginManagementLib();
    }
    return this.instance;
  }

  constructor() {
    this.version = Date.now();
    this.plugins = [];
    this._disabledPlugins;
    this._enabledPlugins;
    this.defaultPlugins = [
      'cms',
      'web-core',
      'home',
      'post',
      'property',
      'user',
      'user_group',
      'user_right',
      'seo',
      'importer',
      'setting',
      'crawler',
      'crawl_template',
      'upload',
      'audit_log',
      'batchlog',
      'email_queue',
      'plugin_management',
      'devtool'
    ];
  }

  addPlugin(name) {
    if (this.defaultPlugins.includes(name)) return;

    this.plugins.push(name);
  }

  async addPluginManagements() {
    const PluginManagement = mongoose.model('PluginManagement');

    for (let i in this.plugins) {
      let pluginName = this.plugins[i];
      let query = { pluginName };
      let plugin = (await PluginManagement.findOne(query)) || new PluginManagement(query);
      plugin.pluginVersion = this.version;
      await plugin.save();
    }
  }

  async removePluginManagements() {
    const PluginManagement = mongoose.model('PluginManagement');

    await PluginManagement.remove({ pluginVersion: { $ne: this.version } });
  }

  async disabledPlugins() {
    if (!this._disabledPlugins) {
      await this.reloadDisabledPlugins();
    }
    return this._disabledPlugins;
  }

  async reloadDisabledPlugins() {
    const PluginManagement = mongoose.model('PluginManagement');

    this._disabledPlugins = _.map(await PluginManagement.find({ enabled: false }, "pluginName").lean(), 'pluginName');
  }

  async enabledPlugins() {
    if (!this._enabledPlugins) {
      await this.reloadEnabledPlugins();
    }
    return this._enabledPlugins;
  }

  async reloadEnabledPlugins() {
    const PluginManagement = mongoose.model('PluginManagement');

    this._enabledPlugins = _.map(await PluginManagement.find({ enabled: true }, "pluginName").sort("cmsOrder").lean(), 'pluginName').concat(this.defaultPlugins);
  }
}
