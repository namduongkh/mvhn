(function() {
    'use strict';

    angular.module("User")
        .controller("UserController", UserController);

    function UserController(UserService, $cookies, $rootScope, toastr, $timeout, ProductSvc) {
        var userCtrl = this;
        userCtrl.accountInfo = {};
        userCtrl.loading = true;

        userCtrl.getAccount = function() {
            UserService.account().then(function(resp) {
                if (resp.status == 200) {
                    userCtrl.accountInfo = resp.data;
                    if (resp.data.roles.indexOf("admin") > -1) {
                        userCtrl.accountInfo.isAdmin = true;
                    }
                }
                userCtrl.loading = false;
            });
        };

        userCtrl.getAccount();

        userCtrl.login = function() {
            UserService.login({
                    email: userCtrl.form.email,
                    password: userCtrl.form.password,
                })
                .then(function(resp) {
                    // console.log("Resp", resp);
                    $cookies.put('token', resp.data.token, {
                        path: "/"
                    });
                    window.location.reload();
                });
        };

        userCtrl.logout = function() {
            UserService.logout()
                .then(function(res) {
                    $cookies.remove('token');
                    window.location.reload();
                }).catch(function(res) {
                    $cookies.remove('token');
                    window.location.reload();
                });
        };

        userCtrl.register = function() {
            UserService.register({
                    email: userCtrl.form.email,
                    password: userCtrl.form.password,
                })
                .then(function(resp) {
                    console.log("Resp", resp);
                    // window.location.reload();
                    toastr.success("Đăng ký tài khoản thành công!", "Thông báo!");
                    $timeout(userCtrl.login, 2000);
                })
                .catch(function(resp) {
                    var error = resp.data;
                    toastr.error(error.message || error, "Thông báo!");
                });
        };

        userCtrl.loadCart = function() {
            UserService.getCart().then(function(resp) {
                if (resp.status == 200) {
                    userCtrl.cart = resp.data;
                    userCtrl.updateCart();
                }
            });
        };

        userCtrl.removeCartItem = function(id) {
            if (confirm("Bạn có chắn chắc muốn xóa?")) {
                UserService.removeCartItem({
                    id: id
                }).then(function(resp) {
                    if (resp.status == 200) {
                        userCtrl.cart = resp.data;
                        userCtrl.updateCart();
                    }
                });
            }
        };

        userCtrl.updateCart = function() {
            userCtrl.cart.allTotal = 0;
            // for (var i = 0; i < userCtrl.cart.products.length; i++) {
            //     let product = userCtrl.cart.products[i];
            //     product.total = Number(product.count) * Number(product.price);
            //     userCtrl.cart.allTotal += product.total;
            //     userCtrl.cart.products = product;
            // }
            userCtrl.cart.products = userCtrl.cart.products.map(function(product) {
                product.total = Number(product.count) * Number(product.price);
                userCtrl.cart.allTotal += product.total;
                return product;
            });
            UserService.updateCart({ cart: userCtrl.cart });
        };

        userCtrl.changeCount = function(product, type) {
            if (type) {
                product.count++;
            } else {
                product.count--;
            }
            product.count = product.count < 1 ? 1 : product.count;
            product.count = product.count > 5 ? 5 : product.count;
            userCtrl.updateCart();
        };

        userCtrl.confirmOrder = function(valid) {
            userCtrl.submitted = true;
            if (!userCtrl.cart.products || !userCtrl.cart.products.length) {
                toastr.error('Chưa có sản phẩm nào trong giỏ!', 'Lỗi!');
                return;
            }
            if (!valid || !userCtrl.cart.user.user_address) {
                toastr.error('Thông tin đặt hàng chưa hợp lệ!', 'Lỗi!');
                return;
            }
            userCtrl.submitting = true;
            ProductSvc.orderProduct(userCtrl.cart)
                .then(function(resp) {
                    // console.log('resp', resp);
                    if (resp.status == 200 && resp.data) {
                        userCtrl.orderSuccess = "Đặt hàng thành công, đơn hàng sẽ được vận chuyển sớm đến bạn.";
                        toastr.success(userCtrl.orderSuccess, 'Thành công!');
                        userCtrl.cart = {
                            user: userCtrl.cart.user,
                            products: [],
                            allTotal: 0
                        };
                        userCtrl.updateCart();
                        // $.magnificPopup.close();
                    } else {
                        toastr.error('Có lỗi xảy ra, liên hệ 01262346655 để được hỗ trợ!', 'Lỗi!');
                    }
                    userCtrl.submitted = false;
                    userCtrl.submitting = false;
                })
                .catch(function() {
                    toastr.error('Có lỗi xảy ra, liên hệ 01262346655 để được hỗ trợ!', 'Lỗi!');
                    userCtrl.submitted = false;
                    userCtrl.submitting = false;
                });
        };
    }
})();