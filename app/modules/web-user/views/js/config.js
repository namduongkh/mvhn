(function() {
    'use strict';

    angular.module('User', [])
        .config(function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[');
            $interpolateProvider.endSymbol(']}');
        });
})();