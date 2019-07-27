import PluginManagementLib from "../../../libs/plugin_management";

export default class CmsPluginManagementsController extends ResourcesController {
  async index() {
    let { shouldReload } = this.request.query;
    delete this.request.query.shouldReload;

    if (shouldReload) {
      await PluginManagementLib.getInstance().reloadDisabledPlugins();
      await PluginManagementLib.getInstance().reloadEnabledPlugins();
    }

    return await super.index();
  }
}
