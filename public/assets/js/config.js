var apiPath = window.location.origin;
if (window.location.port) {
    apiPath = window.settings.services.apiUrl;
}

(function() {
    'use strict';

    const dependencyModules = ["Core", "User", "ngCookies", "ngAnimate", "toastr", "angular-loading-bar",
        'ui.tinymce', 'Product', 'ui.router', 'Home'
    ];

    angular
        .module("HapiApp", dependencyModules)
        .config(function($httpProvider) {
            $httpProvider.defaults.withCredentials = true;
        });
})();