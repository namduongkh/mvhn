import ListEventActions from './actions/list-event-actions';
import Vue from 'vue';
Vue.component('ListEventActions', ListEventActions)
import moment from "moment";

exports.fieldsDisplay = [
  {
    name: 'user',
    title: 'User',
    callback (obj){return obj ? `<a href="/admin#/user/${obj._id}">${obj.name}</a>` : ''},
    callbackExport (obj){return obj ? obj['name'] : ''},
  },
  {
    name: 'user',
    title: 'Email',
    callback (obj){return obj ? `<a href="mailto:${obj.email}">${obj.email}</a>` : ''},
    callbackExport (obj){return obj ? obj['email'] : ''},
  },
  {
    name: 'phone',
    title: 'Điện thoại',
    callback (phone){return phone ? `<a href="tel:${phone}">${phone}</a>` : ''},
    callbackExport (phone){return phone},
  },
  {
    name: 'is_selected',
    title: 'Được chọn tham gia',
    sortField: 'is_selected',
    callback: (is_selected) => {
      if (is_selected)
        return '<span class="label label-pill label-success">Đã được chọn</span>';
      return '<span class="label label-pill label-warning">Không</span>';
    },
    callbackExport(is_selected){
      return is_selected ? 'Đã được chọn' : 'Không';
    }
  },
  {
    name: '__component:ListEventActions',
    title: 'Hành động',
    titleClass: 'text-center',
    dataClass: 'text-center',
    callbackExport(obj){
      return obj ? obj['confirm_code'] : '';
    }
  },
  {
    name: 'createdAt',
    title: 'Thời gian đăng ký',
    callback: (createdAt) => {
      return moment(createdAt).format("DD/MM/YYYY HH:mm");
    }
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
