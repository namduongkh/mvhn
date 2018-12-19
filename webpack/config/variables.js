module.exports = {
    target: 'web',
    ProvidePlugin: {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        "windows.$": "jquery",
        moment: 'moment',
        Popper: ['popper.js', 'default']
    }
}