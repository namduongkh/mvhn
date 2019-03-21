import moment from 'moment'
import LetterHelper from "./letter.helper";

exports.fieldsDisplay = [
  {
    name: 'is_featured',
    title: 'Thư hay',
    sortField: 'is_featured',
    callback: (is_featured) => {
      if (is_featured) {
        return '<span style="font-size:20px;">⭐️</span>';
      }
    },
    callbackExport: (is_featured) => {
      return is_featured ? 'Phải' : '';
    }
  },
  {
    name: 'index',
    title: 'Lá thư thứ',
    sortField: 'index'
  },
  {
    name: 'user',
    title: 'Người gửi',
    callback: (user) => {
      if (!user) {
        return null;
      }
      return `${user.name}`;
    },
    callbackExport: (user) => {
      if (!user) {
        return null;
      }
      return `${user.name}`;
    }
  },
  {
    name: 'user',
    title: 'Email',
    callback: (user) => {
      if (!user) {
        return null;
      }
      return `${user.email}`;
    },
    callbackExport: (user) => {
      if (!user) {
        return null;
      }
      return `${user.email}`;
    }
  },
  {
    name: 'user',
    title: 'SĐT',
    callback: (user) => {
      if (!user) {
        return null;
      }
      return `${user.phone}`;
    },
    callbackExport: (user) => {
      if (!user) {
        return null;
      }
      return `${user.phone}`;
    }
  },
  {
    name: '_id',
    title: 'URL',
    callback: (_id) => {
      return `<a href="${settings.services.webUrl}/xem-thu/${_id}" target="_blank">${settings.services.webUrl}/xem-thu/${_id}</a>`;
    },
    callbackExport: (_id) => {
      return `${settings.services.webUrl}/xem-thu/${_id}`;
    }
  },
  {
    name: 'publish_status',
    title: 'Trạng thái duyệt',
    callback: (status) => {
      let status_class = 'default';
      switch (status) {
        case 1:
          status_class = 'success';
          break;
        case 2:
          status_class = 'danger';
          break;
        case 3:
          status_class = 'default';
          break;
      }
      return `<span class="label label-${status_class}">${LetterHelper.publish_status(status)}</span>`;
    },
    callbackExport: (status) => {
      let status_class = 'default';
      switch (status) {
        case 1:
          status_class = 'success';
          break;
        case 2:
          status_class = 'danger';
          break;
        case 3:
          status_class = 'default';
          break;
      }
      return `${LetterHelper.publish_status(status)}`;
    }
  },
];

exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
