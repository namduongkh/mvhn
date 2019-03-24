module.exports = {
    target: 'web',
    ProvidePlugin: {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        "windows.$": "jquery",
        Tether: 'tether',
        'window.Tether': 'tether',
        _: 'lodash',
        is: 'is_js',
        moment: 'moment',
        toastr: 'toastr',
        Popper: ['popper.js', 'default']
    }
}