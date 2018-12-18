(function() {
    'use strict';

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