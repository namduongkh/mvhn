const PluginManagement = () => import('./components/PluginManagement');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Plugin Management', 'plugin_managements', {
  iconClass: 'fa fa-plug',
  color: 'blue-dirty',
})
  .index(PluginManagement, "Plugin Manager")
  .toObject();
