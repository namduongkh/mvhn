import moment from 'moment';

function dateFormat(date){
    if(!date) return '';
    return moment(date).format("DD/MM/YYYY");
}
exports.fieldsDisplay = [
    {
        name: '_id',
        title: 'ID',
        sortField: '_id'
    },
    {
        name: 'name',
        title: 'Full Name',
        sortField: 'name'
    },
    {
        name: 'refer_code',
        title: 'Refer Code',
    },
    {
        name: 'refered_code',
        title: 'Refered Code',
    },
    {
        name: 'total_points',
        title: 'Total point',
    },
    {
        name: 'email',
        title: 'Email',
        sortField: 'email'
    },
    {
        name: 'phone',
        title: 'Phone',
        sortField: 'phone'
    },
    {
        name: 'is_pregnant',
        title: 'Nhóm',
        sortField: 'is_pregnant',
        callback: (is_pregnant) => {
            if(is_pregnant){
                return '<span class="badge badge-pill badge-warning">Mẹ bầu</span>';
            }
            return '<span class="badge badge-pill badge-info">Mẹ có con</span>';
        },
        callbackExport: (is_pregnant)=> {
            if(is_pregnant){
                return 'Mẹ bầu';
            }
            return 'Mẹ có con';
        }
    },
    {
        title: 'Ngày sinh của mẹ',
        name: 'dob',
        sortField: 'dob',
        callback: dateFormat,
        callbackExport: dateFormat
    },
    {
        title: 'Ngày dự sinh',
        name: 'estimate_baby_dob',
        sortField: 'estimate_baby_dob',
        callback: dateFormat,
        callbackExport: dateFormat
    },
    {
        title: 'Ngày sinh của bé',
        name: 'baby_dob',
        sortField: 'baby_dob',
        callback: dateFormat,
        callbackExport: dateFormat
    },
    {
        name: 'roles',
        title: 'Roles',
        dataClass: 'text-center',
        callback: (roles) => {
            let str = '';
            for (let index in roles) {
                let role = roles[index];
                switch (role) {
                    case 'admin':
                        str += '<span class="badge badge-pill badge-info">Admin</span>';
                        break;
                    case 'user':
                        str += '<span class="badge badge-pill badge-info">User</span>';
                        break;
                }
                if (index < roles.length - 1) {
                    str += '<br/>'
                }
            };
            return str;
        }
    },

];


exports.sortOrder = [
    { field: 'createdAt', direction: 'asc' }
];