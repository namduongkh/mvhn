(function() {
    'use strict';

    angular.module('Home', [])
        .config(function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[');
            $interpolateProvider.endSymbol(']}');
        });
})();