const structure = {



    "user": {

        "label": "User",
        "type": "select2",
        "list": true, // show on list page

        "ref": "users",
    },



    "amount": {

        "label": "Amount",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "content": {

        "label": "Content",
        "type": "editor", // textarea, json_editor
        "list": false, // show on list page

    },



    "type": {

        "label": "Type",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



    "paymentStatus": {

        "label": "Payment Status",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page

    },



}

export default structure;
