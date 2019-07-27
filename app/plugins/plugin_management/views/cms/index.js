const PluginManagement = () => import('./components/PluginManagement');
import CmsRouter from "@Core/cms_router";

export default new CmsRouter('Plugin Managements', 'plugin_managements', {
  iconClass: 'fa fa-dot-circle-o',
  color: 'blue-dirty',
})
  .index(PluginManagement, "Plugin Manager")
  .toObject();
