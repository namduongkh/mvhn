const structure = {
    "name": {
        "label": "Name",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
    "model": {
        "label": "Model",
        "type": "text", // select, textarea, editor, image, images, json_editor
    },
    "object": {
        "label": "Object",
        "type": "text",
    },
    "progress": {
        "label": "Progress",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
    "logs": {
        "label": "Logs",
        "type": "json_editor", // select, textarea, editor, image, images, json_editor
    },
    "options": {
        "label": "Options",
        "type": "json_editor",
    },
    "type": {
        "label": "Type",
        "type": "text", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
    "outputFiles": {
        "label": "Output Files",
        "type": "text", // select, textarea, editor, image, images, json_editor
    },
    "processStatus": {
        "label": "Process Status",
        "type": "select", // select, textarea, editor, image, images, json_editor
        "list": true, // show on list page
    },
}

export default structure;
