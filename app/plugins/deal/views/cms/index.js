const ListOption = () => import('./components/deal_option/List');
const DetailOption = () => import('./components/deal_option/Detail');
const ListBet = () => import('./components/bet/List');
const DetailBet = () => import('./components/bet/Detail');
const List = () => import('./components/deal/List');
const Detail = () => import('./components/deal/Detail');

import CmsRouter from "@Core/cms_router";

export default [
  new CmsRouter('Deals', 'deals', {
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
  })
    .default({
      List,
      Detail
    })
    .toObject(),

  new CmsRouter('Deal Options', 'deals/:dealId/deal_options', {
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
  })
    .index(ListOption, null, {
      hidden: true
    })
    .new(DetailOption)
    .edit(DetailOption)
    .toObject(),

  new CmsRouter('Bets', 'deals/:dealId/bets', {
    iconClass: 'fa fa-dot-circle-o',
    color: 'blue-dirty',
  })
    .index(ListBet, null, {
      hidden: true
    })
    // .new(DetailBet)
    // .edit(DetailBet)
    .toObject(),
]
