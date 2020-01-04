const structure = {
    "from.name": {
        "label": "Name",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
    "from.address": {
        "label": "Address",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
    "content": {
        "label": "Content",
        "type": "textarea", // textarea, json_editor
    },
    "context": {
        "label": "Context",
        "type": "json_editor", // select, textarea, editor, image, images, json_editor
    },
    "transferStatus": {
        "label": "Transfer Status",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
}

export default structure;
