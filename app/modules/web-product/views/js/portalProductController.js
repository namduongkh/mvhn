(function() {
    'use strict';

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