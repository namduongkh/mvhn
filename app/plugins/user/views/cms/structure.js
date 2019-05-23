const structure = {


    "name": {

        "label": "Name",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },


    "email": {

        "label": "Email",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },


    "phone": {

        "label": "Phone",
        "type": "text", // select, textarea, editor, image, images, json_editor

    },


    "status": {

        "label": "Status",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },


    "roles": {

        "label": "Roles",
        "type": "select2",
        "multiple": true,

    },

    "avatar": {

        "label": "Avatar",
        "type": "image", // select, textarea, editor, image, images, json_editor

    },
}

export default structure;