(function() {
    'use strict';

    angular.module("Core")
        .controller("CoreController", CoreController)

    function CoreController($scope, $http) {
        var coreCtrl = this;

        coreCtrl.loadBanner = function() {
            $http.get(apiPath + "/api/product/productBanner")
                .then(function(resp) {
                    if (resp.status == 200) {
                        coreCtrl.bannerList = resp.data;
                    }
                });
        };

    }
})();