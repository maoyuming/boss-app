/**
 * Created by jnduan on 16/7/3.
 */
(function () {
    'use strict';

    angular
        .module('dtk.order')
        .controller('OrderDetailCtrl', OrderDetailCtrl);

    OrderDetailCtrl.$inject = ['$scope', '$state', '$stateParams', 'OrderService', '$timeout'];

    /* @ngInject */
    function OrderDetailCtrl($scope, $state, $stateParams, OrderService, $timeout) {
        var vm = this;
        vm.title = 'OrderDetailCtrl';
        activate();
        function activate() {
            var orderId = $stateParams.orderId;

            $scope.gotoPage = function (to) {
                $timeout(function () {
                    $state.go(to);
                }, 150);
            };

            $scope.cancelOrder = function (order) {
                OrderService.cancelOrder({
                    data: JSON.stringify({orderId: order.id})
                }).success(function (result) {
                    if (result.result == 'true') {
                        alert('订单取消成功');
                    }
                    else {
                        alert('订单取消失败');
                    }
                }).error(function (result) {
                    alert('订单取消异常');
                });
            };

            $scope.goToBeConfirmed = function goToBeConfirmed() {
                $state.go("tab.orders");
            }
            $scope.submitOrder = function (order) {
                OrderService.scPay({
                    orderId: order.id,
                    type: 1,
                    payChannel: 2,
                    feeType: 1,
                    customerId: order.customerId,
                    sum: order.totalPrice * 100
                }).success(function (result) {
                    if (result.result == 'true') {
                        alert('支付成功');
                    }
                    else {
                        alert('支付失败:' + result.errorMessage);
                    }
                }).error(function (result) {
                    alert('支付失败:' + result.errorMessage);
                });
            };


            OrderService.detail({orderId: orderId})
                .success(function (result) {
                    console.log(result);
                    if (result.result == 'true') {
                        var _data = {
                            id: result.data.id,
                            totalPrice: result.data.totalPrice,
                            checkInDate: moment(result.data.beginTime).format('YYYY年MM月DD日'),
                            checkOutDate: moment(result.data.endTime).format('YYYY年MM月DD日'),
                            createTime: moment(result.data.createTime).format('YYYY-MM-DD HH:mm:ss'),
                            contact: result.data.contact,
                            //phone: result.data.contactPhone.substr(0, 3) + '****' + result.data.contactPhone.substr(7),
                            phone: result.data.contactPhone,
                            memo: result.data.memo,
                            orderPrice: result.data.totalPrice,
                            hotelName: result.data.supplierName,
                            customerId: result.data.customerId,
                            orderStatus: orderStatusTranslate(result.data.status),
                            payStatus: payStatusTranslate(result.data.payStatus),
                            orderType: orderTypeTranslate(result.data.flag)
                        };
                        var orderDetails = [];

                        _.each(result.data.orderDetails, function (detail) {
                            var _detail = {
                                name: detail.skuName,
                                num: detail.num,
                                price: []
                            };
                            _.each(detail.priceDetails, function (priceInfo) {
                                _detail.price.push({
                                    // actionTime: moment(priceInfo.actionTime).format('YYYY-MM-DD'),
                                    price: priceInfo.price
                                })
                            });

                            orderDetails.push(_detail);
                        });
                        _data.orderDetails = orderDetails;
                    }
                    $scope.order = _data;
                })
                .error(function (result) {
                    console.log(result);
                });

        }
    }

})();

