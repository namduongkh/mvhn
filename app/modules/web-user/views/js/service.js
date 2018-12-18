(function() {
    'use strict';

    angular.module("User")
        .service("UserService", UserService);

    function UserService($http) {
        var account;
        return {
            login: function(data) {
                return $http({
                    method: "POST",
                    url: apiPath + "/api/user/login",
                    data: data
                });
            },
            logout: function(data) {
                return $http({
                    method: "GET",
                    url: apiPath + "/api/user/logout",
                });
            },
            account: function(data) {
                if (!account) {
                    account = $http({
                        method: "GET",
                        url: apiPath + "/api/user/account",
                    });
                }
                return account;
            },
            register: function(data) {
                return $http({
                    method: "POST",
                    url: apiPath + "/api/user/register",
                    data: data
                });
            },
            getCart: function() {
                return $http({
                    method: "GET",
                    url: apiPath + "/api/user/getCart",
                });
            },
            removeCartItem: function(data) {
                return $http({
                    method: "POST",
                    url: apiPath + "/api/user/removeCartItem",
                    data: data
                });
            },
            updateCart: function(data) {
                return $http({
                    method: "POST",
                    url: apiPath + "/api/user/updateCart",
                    data: data
                });
            },
        }
    }
})();