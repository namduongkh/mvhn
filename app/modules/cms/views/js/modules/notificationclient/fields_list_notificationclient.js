import ActionNotifyBtn from './action-list/notify-button';
import Vue from 'vue';
Vue.component('ActionNotifyBtn', ActionNotifyBtn)
exports.fieldsDisplay =  [
    {
        name: 'user',
        titleClass: 'text-center',
        title: 'User',
        callback: function(val){
          if(val){
            return val.name;
          }
          else{
            return 'Guest';
          }
        }
    },
    {
        name: '__component:ActionNotifyBtn',
        title: 'Notify',
        titleClass: 'text-center',
        dataClass: 'text-center'
    },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'asc' }
];
