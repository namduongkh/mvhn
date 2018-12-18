(function() {
    'use strict';

    angular.module("Core")
        .directive("showLoading", showLoading);

    function showLoading($parse) {
        return {
            restrict: 'AE',
            link: function(scope, elem, attr) {
                scope.$watch(attr.showLoading, function(value) {
                    if (value) {
                        $(elem).fadeIn('fast');
                    }
                });
            }
        };
    }
})();