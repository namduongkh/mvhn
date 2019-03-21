exports.fieldsDisplay = [{
        name: '_id',
        title: 'ID',
        sortField: '_id'
    },
    {
        name: 'name',
        title: 'Name',
        sortField: 'name'
    },
    {
        name: 'slug',
        title: 'Slug',
        // sortField: 'email'
    },
    {
        name: 'description',
        title: 'Description',
        // sortField: 'phone'
    },
    {
        name: 'type',
        title: 'Type',
        // sortField: 'email',
        callback: (type) => {
            let str = '';
            switch (type) {
                case 'product':
                    str = '<span class="label label-pill label-success">Product</span>';
                    break;
                case 'post':
                    str = '<span class="label label-pill label-info">Post</span>';
                    break;
                case 'banner':
                    str = '<span class="label label-pill label-primary">Banner</span>';
                    break;
                case 'question':
                    str = '<span class="label label-pill label-primary">Question</span>';
                    break;
                default:
                    str = '<span class="label label-pill label-success">Product</span>';
                    break;
            }
            return str;
        },
        callbackExport: (type) => {
            let str = '';
            switch (type) {
                case 'product':
                    str = 'Product';
                    break;
                case 'post':
                    str = 'Post';
                    break;
                case 'banner':
                    str = 'Banner';
                    break;
                default:
                    str = 'Product';
                    break;
            }
            return str;
        }
    },
];


exports.sortOrder = [
    { field: 'name', direction: 'asc' }
];