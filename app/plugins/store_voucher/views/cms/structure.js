const structure = {
    "name": {
        "label": "Name",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
    "code": {
        "label": "Code",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
    "quantity": {
        "label": "Quantity",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
    "reduceValue": {
        "label": "Reduce Value",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": false, // show on list page
    },
    "reduceType": {
        "label": "Reduce Type",
        "type": "select", // select, textarea, editor, image, images, json_editor
        "list": false, // show on list page
    },
    "appliedOrders": {
        "label": "Applied Orders",
        "type": "json_editor",
        "list": false, // show on list page
    },
}

export default structure;
