import user from './user';
import post from './post';
import category from './category';
import setting from './setting';
import notFound from './404';
import product from './product';
import award from './award';
import card from './card';
import review from './review';
import question from './question';
import redeemhistory from './redeemhistory';
import page from './page';
import notificationclient from './notificationclient'
import playlist from './playlist'
import tip from './tip'
import voucher from './voucher'
import antenatal from './antenatal'
import customdata from './customdata'
import dynamicdata from './dynamicdata'
import sms from './sms'
import letter from './letter'
import eventregister from './eventregister'
import voucherhistory from './voucherhistory'
import pointlog from './pointlog'
import campaign from './campaign'
/*generator import module*/
/*(Please do not delete comment above)*/

export default [
  user,
  product,
  post,
  category,
  // award,
  // redeemhistory,
  voucher,
  card,
  review,
  question,
  letter,
  page,
  dynamicdata,
  customdata,
  setting,
  notFound,
  /*generator inject module*/
		campaign,
    voucherhistory,
    pointlog,
		eventregister,
  antenatal,
  tip,
  playlist,
  sms,
  // notificationclient,
  /*(Please do not delete comment above)*/
];