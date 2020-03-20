const structure = {



    "name": {

        "label": "Name",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "url": {

        "label": "Url",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "urlPattern": {

        "label": "Url Pattern",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "category": {

        "label": "Category",
        "type": "select2",
        "list": false, // show on list page

        "ref": "properties",
    },



    "tags": {

        "label": "Tags",
        "type": "select2",
        "list": false, // show on list page

        "ref": "properties",
    },



}

export default structure;
