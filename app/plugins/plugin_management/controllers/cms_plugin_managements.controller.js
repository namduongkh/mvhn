import PluginManagementLib from "../../../libs/plugin_management";
import { ResourcesController } from "@core/modules";

export default class CmsPluginManagementsController extends ResourcesController {
  async index() {
    try {
      await PluginManagementLib.getInstance().reloadVersion();
    } catch (error) {
      console.log(error);
    }

    let { shouldReload } = this.request.query;
    delete this.request.query.shouldReload;

    if (shouldReload) {
      await PluginManagementLib.getInstance().reloadDisabledPlugins();
      await PluginManagementLib.getInstance().reloadEnabledPlugins();
    }

    return await super.index();
  }
}
