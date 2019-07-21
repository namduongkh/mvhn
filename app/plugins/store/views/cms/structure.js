const structure = {



    "name": {

        "label": "Name",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "description": {

        "label": "Description",
        "type": "editor", // textarea, json_editor

    },



    "address": {

        "label": "Address",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "owner": {

        "label": "Owner",
        "type": "select2",
        "list": true, // show on list page

        "ref": "users",
    },



}

export default structure;