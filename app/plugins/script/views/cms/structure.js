const structure = {



    "name": {

        "label": "Name",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "slug": {

        "label": "Slug",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "code": {

        "label": "Code",
        "type": "textarea", // select, textarea, editor, image, images, json_editor

    },



    "user": {

        "label": "User",
        "type": "select2",

        "ref": "users",
    },



}

export default structure;
