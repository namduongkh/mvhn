const structure = {


    "name": {

        "label": "Name",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },


    "slug": {

        "label": "Slug",
        "type": "text", // select, textarea, editor, image, images, json_editor

    },


    "url": {

        "label": "Url",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },


    "thumb": {

        "label": "Thumb",
        "type": "image",
        "list": true, // show on list page

    },


    "content": {

        "label": "Content",
        "type": "editor", // textarea, json_editor

    },


    "price": {

        "label": "Price",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },


    "category": {

        "label": "Category",
        "type": "select2",
        "list": true, // show on list page

        "ref": "properties",
    },


    "tags": {

        "label": "Tags",
        "type": "select2",
        "list": true, // show on list page

        "ref": "properties",
    },


    "status": {

        "label": "Status",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },

}

export default structure;