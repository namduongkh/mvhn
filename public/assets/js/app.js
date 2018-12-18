(function() {
    'use strict';

    angular.module("Core", [])
        .config(["$interpolateProvider", function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[');
            $interpolateProvider.endSymbol(']}');
        }]);
})();
(function() {
    'use strict';

    CoreController.$inject = ["$scope", "$http"];
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
(function() {
    'use strict';

    showLoading.$inject = ["$parse"];
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
(function() {
    'use strict';

    angular.module("Core")
        .filter("vndCurrency", vndCurrency);

    function vndCurrency() {
        return function(data, kStep, short) {

            if (kStep) {
                data = parseFloat(data) + parseFloat(kStep);
                if (short) {
                    data /= 1000;
                }
            }

            if (data == 0) return "0 đ";

            if (data) {

                data = data.toString().split('').reverse();

                var output = '';
                for (var i = 1; i <= data.length; i++) {
                    if (i % 3 == 0 && i != 0) {
                        output += (data[i - 1] + '.');
                    } else {
                        output += data[i - 1];
                    }
                }

                var outputTmp = output.split('').reverse();

                if (outputTmp[0] == '.') {
                    outputTmp.splice(0, 1);
                }

                if (!short) {
                    return outputTmp.join('') + ' đ';
                } else {
                    return outputTmp.join('').toString();
                }
            }
        };
    }
})();
(function() {
    'use strict';

    angular.module('Home', [])
        .config(["$interpolateProvider", function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[');
            $interpolateProvider.endSymbol(']}');
        }]);
})();
(function() {
    'use strict';

    HomeController.$inject = ["ProductSvc", "toastr", "$http", "$sce"];
    angular.module('Home')
        .controller('HomeController', HomeController);

    function HomeController(ProductSvc, toastr, $http, $sce) {
        var home = this;
        home.orderCount = 1;

        home.loadPage = function() {
            ProductSvc.productList().then(function(resp) {
                // console.log("resp", resp);
                if (resp.status == 200) {
                    home.productList = resp.data;
                    home.productBannerList = resp.data.filter(function(i) {
                        if (i.banner) {
                            i.intro = $sce.trustAsHtml(i.intro);
                            return i;
                        }
                    });
                    console.log(home.productBannerList);
                }
            });
        };

        home.detailProduct = function(slug) {
            ProductSvc.detailProduct({ slug }).then(function(resp) {
                if (resp.status == 200) {
                    home.productDetail = resp.data;
                    home.productDetail.description = $sce.trustAsHtml(home.productDetail.description);
                    home.productDetail.intro = $sce.trustAsHtml(home.productDetail.intro);
                }
            });
        };

        home.changeOrderCount = function(type) {
            if (type) {
                home.orderCount++;
            } else {
                home.orderCount--;
            }
            home.orderCount = home.orderCount < 1 ? 1 : home.orderCount;
            home.orderCount = home.orderCount > 5 ? 5 : home.orderCount;
        };

        home.order = {};

        home.openOrder = function() {
            var name = home.productDetail.title;
            var productId = home.productDetail._id;
            var price = home.productDetail.price * home.orderCount;
            if (!name || !price || !productId) {
                return;
            }
            ProductSvc.addCart({
                    productId,
                    count: home.orderCount
                })
                .then(function(resp) {
                    if (resp.status == 200) {
                        window.location.href = window.settings.services.webUrl + "/gio-hang";
                    }
                });
            // home.order = {
            //     product_name: name,
            //     product_price: price
            // };
            // $.magnificPopup.open({
            //     items: {
            //         src: "#order-form"
            //     },
            //     fixedContentPos: true
            // });
        };

        home.confirmOrder = function(valid) {
            home.submitted = true;
            if (!valid || !home.order.user_address) {
                toastr.error('Thông tin đặt hàng chưa hợp lệ!', 'Lỗi!');
                return;
            }
            home.submitting = true;
            ProductSvc.orderProduct({
                    product_name: home.order.product_name,
                    product_count: home.orderCount,
                    product_price: home.order.product_price,
                    user_name: home.order.user_name,
                    user_address: home.order.user_address,
                    user_email: home.order.user_email,
                    user_phone: home.order.user_phone,
                    user_note: home.order.user_note,
                })
                // $http({
                //         method: 'post',
                //         url: 'https://www.bidy.vn/api/testSendEmail',
                //         data: {
                //             sender: {
                //                 user: 'openness.sender.email@gmail.com',
                //                 pass: 'phongnguyen.94'
                //             },
                //             send_from: home.order.user_email || 'openness.sender.email@gmail.com',
                //             send_to: 'namduong.kh94@gmail.com',
                //             subject: 'Đơn đặt hàng ' + home.order.product_name + ' ' + new Date().toLocaleString(),
                //             content: `Mặt hàng: ${home.order.product_name}, Số lượng: ${home.order_count}, Giá: ${home.order.product_price}, Họ tên: ${home.order.user_name}, Điện thoại: ${home.order.user_phone}, Địa chỉ: ${home.order.user_address}, Email: ${home.order.user_email || ''}, Ghi chú: ${home.order.user_note || ''}`
                //         }
                //     })
                .then(function(resp) {
                    // console.log('resp', resp);
                    if (resp.status == 200 && resp.data) {
                        toastr.success('Đặt hàng thành công, đơn hàng đang được xử lý', 'Thành công!');
                        $.magnificPopup.close();
                    } else {
                        toastr.error('Có lỗi xảy ra, liên hệ 01262346655 để được hỗ trợ!', 'Lỗi!');
                    }
                    home.submitted = false;
                    home.submitting = false;
                })
                .catch(function() {
                    toastr.error('Có lỗi xảy ra, liên hệ 01262346655 để được hỗ trợ!', 'Lỗi!');
                    home.submitted = false;
                    home.submitting = false;
                });
        };
    }
})();
(function() {
    'use strict';

    angular.module('Product', [])
        .config(["$interpolateProvider", function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[');
            $interpolateProvider.endSymbol(']}');
        }]);
})();
(function() {
    'use strict';

    PortalProductController.$inject = ["ProductSvc", "toastr", "$window", "$timeout"];
    angular.module("Product")
        .controller("PortalProductController", PortalProductController);

    function PortalProductController(ProductSvc, toastr, $window, $timeout) {
        var portal = this;
        portal.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | fontselect fontsizeselect bold italic | alignleft aligncenter alignright | code',
            menubar: false,
        };

        portal.createProduct = function(isValid) {
            if (!isValid) {
                toastr.error("Kiểm tra dữ liệu form");
                return;
            }
            ProductSvc.createProduct({
                    title: portal.form.title,
                    price: portal.form.price,
                    description: portal.form.description,
                    slug: portal.form.slug,
                    imageLink: portal.form.imageLink,
                    bannerLink: portal.form.bannerLink,
                    intro: portal.form.intro,
                })
                .then(function(resp) {
                    // console.log("resp", resp);
                    if (resp.status == 200) {
                        toastr.success("Thêm sản phẩm thành công");
                        $timeout(function() {
                            window.location.href = $window.settings.services.webUrl + "/portal/product/" + portal.form.slug + "/edit";
                        }, 2000)
                    } else {
                        toastr.error("Xảy ra lỗi");
                    }
                })
                .catch(function(err) {
                    toastr.error("Xảy ra lỗi");
                });
        };
        portal.updateProduct = function(isValid) {
            if (!isValid) {
                toastr.error("Kiểm tra dữ liệu form");
                return;
            }
            ProductSvc.updateProduct({
                    productId: portal.form._id,
                    title: portal.form.title,
                    price: portal.form.price,
                    description: portal.form.description,
                    slug: portal.form.slug,
                    imageLink: portal.form.imageLink,
                    bannerLink: portal.form.bannerLink,
                    intro: portal.form.intro,
                })
                .then(function(resp) {
                    // console.log("resp", resp);
                    if (resp.status == 200) {
                        toastr.success("Sửa sản phẩm thành công");
                        portal.form = resp.data;
                    } else {
                        toastr.error("Xảy ra lỗi");
                    }
                })
                .catch(function(err) {
                    toastr.error("Xảy ra lỗi");
                });
        };

        portal.changeTitle = function(title) {
            portal.form.slug = slug(title).toLowerCase();
        };

        portal.getListProduct = function() {
            ProductSvc.productList().then(function(resp) {
                if (resp.status == 200) {
                    portal.productList = resp.data;
                }
            });
        };

        portal.deleteProduct = function(product_id, index) {
            if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
                ProductSvc.deleteProduct({ product_id }).then(function(resp) {
                    if (resp.status == 200 && resp.data) {
                        toastr.success("Đã xóa sản phẩm thành công!");
                        portal.productList.splice(index, 1);
                    } else {
                        toastr.error("Có lỗi xảy ra!");
                    }
                });
            }
        };

        portal.getProduct = function(slug) {
            if (!slug) {
                window.location.href = $window.settings.services.webUrl + "/portal/product"
            } else {
                ProductSvc.detailProduct({ slug }).then(function(resp) {
                    if (resp.status == 200) {
                        portal.form = resp.data;
                    }
                });
            }
        };
    }
})();
(function() {
    'use strict';

    ProductSvc.$inject = ["$http"];
    angular.module('Product')
        .service("ProductSvc", ProductSvc);

    function ProductSvc($http) {
        return {
            productList: function() {
                return $http.get(apiPath + "/api/product/productList");
            },
            createProduct: function(data) {
                return $http.post(apiPath + "/api/product/createProduct", data);
            },
            updateProduct: function(data) {
                return $http.post(apiPath + "/api/product/updateProduct", data);
            },
            detailProduct: function(data) {
                return $http.post(apiPath + "/api/product/detailProduct", data);
            },
            orderProduct: function(data) {
                return $http.post(apiPath + "/api/product/order", data);
            },
            deleteProduct: function(data) {
                return $http.post(apiPath + "/api/product/deleteProduct", data);
            },
            addCart: function(data) {
                return $http.post(apiPath + "/api/product/addCart", data);
            },
        };
    }
})();
(function() {
    'use strict';

    angular.module('User', [])
        .config(["$interpolateProvider", function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[');
            $interpolateProvider.endSymbol(']}');
        }]);
})();
(function() {
    'use strict';

    UserController.$inject = ["UserService", "$cookies", "$rootScope", "toastr", "$timeout", "ProductSvc"];
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
(function() {
    'use strict';

    UserService.$inject = ["$http"];
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