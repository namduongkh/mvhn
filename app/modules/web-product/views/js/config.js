(function() {
    'use strict';

    angular.module('Product', [])
        .config(function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[');
            $interpolateProvider.endSymbol(']}');
        });
})();