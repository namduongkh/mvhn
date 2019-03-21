exports.fieldsDisplay = [
  {
    name: 'thumb',
    titleClass: 'text-center',
    title: 'Hình ảnh',
    callback(val) { return `<img src="/${val}" alt="${val}"/ style="width:150px">` },
    sortField: 'thumb'
  },
  {
    name: 'title',
    title: 'Tên sản phẩm',
    sortField: 'title',
  },
  {
    name: 'category',
    title: 'Loại sản phẩm',
    callback(category) {
      return category ? category.map((c) => {
        return c.name;
      }).join('</br>') : null;
    }
  },
  {
    name: 'age',
    title: 'Độ tuổi',
    callback(age) {
      if (!age) return;
      if (typeof age !== 'object') {
        age = {
          from: typeof age !== 'undefined' ? age : "",
          to: typeof age !== 'undefined' ? age : ""
        };
      }
      return (typeof age.from !== 'undefined' ? age.from : "") + ' - ' + (typeof age.to !== 'undefined' ? age.to : "");
    }
  },
  {
    name: 'weight',
    title: 'Cân nặng',
    callback(weight) {
      if (!weight) return;
      return weight.from + ' - ' + weight.to + ' kg';
    }
  },
  // {
  //   name: 'for_mom',
  //   title: 'Dành cho',
  //   sortField: 'for_mom',
  //   callback(val) { return `<span class="label label-pill label-primary">${typeof val != 'undefined' && val ? 'Mẹ bầu' : 'Mẹ có con'}</span>` },
  // },
];


exports.sortOrder = [
  { field: 'title', direction: 'asc' },
];
