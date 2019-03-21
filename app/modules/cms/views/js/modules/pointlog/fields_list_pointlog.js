import moment from 'moment'
exports.fieldsDisplay = [
  {
    name: 'content',
    titleClass: 'text-center',
    title: 'Hoạt động',
    callback(content) {
      if (content.includes('mã chia sẻ)')) return content;
      if (content.includes('mã chia sẻ')) {
        content = "Điểm cho người mời (người khác dùng mã chia sẻ)";
      }
      if (content.includes('mã liên kết')) {
        content = "Điểm cho người được mời (sử dụng mã chia sẻ)";
      }
      return content;
    },
    callbackExport(content) {
      if (content.includes('mã chia sẻ)')) return content;
      if (content.includes('mã chia sẻ')) {
        content = "Điểm cho người mời (người khác dùng mã chia sẻ)";
      }
      if (content.includes('mã liên kết')) {
        content = "Điểm cho người được mời (sử dụng mã chia sẻ)";
      }
      return content;
    }
  },
  {
    name: 'point',
    titleClass: 'text-center',
    title: 'Điểm',
    // sortField: 'point',
    callback: (point) => {
      return point > 0 ? '+' + point : point;
    }
  },
  {
    name: 'user',
    titleClass: 'text-center',
    title: 'Tên mẹ',
    // sortField: 'user'
    callback: (user) => {
      return user && user.name
    },
    callbackExport: (user) => {
      return user && user.name
    },
  },
  {
    name: 'user',
    titleClass: 'text-center',
    title: 'Email',
    // sortField: 'user'
    callback: (user) => {
      return user && user.email
    },
    callbackExport: (user) => {
      return user && user.email
    },
  },
  {
    name: 'user',
    titleClass: 'text-center',
    title: 'Phone',
    // sortField: 'user'
    callback: (user) => {
      return user && user.phone
    },
    callbackExport: (user) => {
      return user && user.phone
    },
  },
  {
    name: 'campaign',
    titleClass: 'text-center',
    title: 'Campaign',
    // sortField: 'point',
    callback: (campaign) => {
      return (campaign && campaign.name) || campaign;
    },
    callbackExport: (campaign) => {
      return (campaign && campaign.name) || campaign;
    }
  },
];


exports.sortOrder = [
  { field: 'createdAt', direction: 'desc' }
];
