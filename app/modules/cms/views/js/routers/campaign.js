const ListCampaign = () => import ('@module/campaign/ListCampaign');
const DetailCampaign = () => import ('@module/campaign/DetailCampaign');

export default {
  name: 'Campaign',
  path: '/campaign_managerment',
  meta: {
    title: 'Campaigns',
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty'
  },
  childrens: [
    {
      name: 'campaigns',
      path: '/campaigns',
      hidden: false,
      component: ListCampaign,
      meta: {
        title: 'List Campaign'
      }
    },
    {
      name: 'create_campaign',
      path: '/campaign',
      component: DetailCampaign,
      meta: {
        title: 'New campaign'
      }
    },
    {
      name: 'edit_campaign',
      path: '/campaign/:id',
      hidden: true,
      component: DetailCampaign,
      meta: {
        title: 'Edit campaign'
      }
    }
  ]
}
