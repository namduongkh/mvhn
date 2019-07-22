const structure = {



    "orderName": {

        "label": "Order Name",
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