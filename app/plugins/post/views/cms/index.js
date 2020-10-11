const List = () => import('./components/List');
const Detail = () => import('./components/Detail');
const LinkMapper = () => import('./components/LinkMapper');
import CmsRouter from "@Core/cms_router";

let routerConfigs = [];
for (let type in allowedPostTypes) {
  let config = allowedPostTypes[type];
  let routerConfig = new CmsRouter(config.name || type, `${type}/posts`, {
    iconClass: config.iconClass || 'fa fa-pencil-square-o',
    color: config.color || 'blue-dirty'
  })
    .index(List)
    .new(Detail, null, {
      scope: ['admin']
    })
    .edit(Detail)
    .customRedirect({
      title: 'Property',
      name: 'ListProperties',
      params: { postType: type }
    })

  if (type == 'post') {
    routerConfig = routerConfig.customRoute('maplink', {
      name: `MapLinkPost`,
      path: `/posts/maplink/:id`,
      hidden: true,
      component: LinkMapper
    }, 'edit')
  }

  routerConfigs.push(routerConfig.toObject())
}

export default routerConfigs;
