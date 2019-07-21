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



    "image": {

        "label": "Image",
        "type": "image",

    },



    "price": {

        "label": "Price",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "store": {

        "label": "Store",
        "type": "select2",
        "list": true, // show on list page

        "ref": "stores",
    },



}

export default structure;