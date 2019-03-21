const List = () => import('@module/question/List');
const Detail = () => import('@module/question/Detail');

export default {
    name: 'Questions',
    path: '/question_managerment',
    meta: {
        title: 'Tư vấn',
        iconClass: 'fa fa-question-circle',
        color: 'blue-dirty',
        permission: ['admin', 'consultant']
    },
    childrens: [
        {
            name: 'questions',
            path: '/questions',
            hidden: false,
            component: List,
            meta: {
                title: 'Danh sách câu hỏi',
                permission: ['admin', 'consultant']
            }
        },
        // {
        //     name: 'create_question',
        //     path: '/question',
        //     component: Detail,
        //     meta: {
        //         title: 'New question'
        //     }
        // },
        {
            name: 'edit_question',
            path: '/question/:id',
            hidden: true,
            component: Detail,
            meta: {
                title: 'Edit question',
                permission: ['admin', 'consultant']
            }
        }
    ]
}