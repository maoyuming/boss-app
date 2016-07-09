/**
 * Created by jnduan on 16/6/28.
 */
(function () {
    'use strict';

    angular
        .module('dtk.order')
        .controller('OrdersCtrl', OrdersCtrl);

    OrdersCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'OrderService'];

    /* @ngInject */
    function OrdersCtrl($rootScope, $scope, $state, $stateParams, $timeout, OrderService) {
        var vm = this;
        vm.title = 'OrdersCtrl';

        var tabNames = ['all', 'prepay', 'going', 'done', 'canceled'];

        activate();

        ////////////////

        function activate() {
            $scope.gotoPage = function (to) {
                $timeout(function () {
                    $state.go(to);
                }, 150);
            };

            $scope.currentTab = 'going';
            $scope.orderData = [];
            $scope.switchTo = function (tabName) {
                if (!LoginInfo.getLoginInfo()) {
                    $rootScope.openLoginModal.call(null);
                }

                var idx = _.find(tabNames, function (_name) {
                    return _name == tabName
                });
                if (!idx) {
                    tabName = 'going';
                }
                $scope.currentTab = tabName;

                var status = '30,50';

                switch (tabName) {
                    case 'all':
                        status = '0,30,50,100,200,250,500';
                        break;
                    case 'going':
                        status = '30,50';
                        break;
                    case 'prepay':
                        status = '0';
                        break;
                    case 'done':
                        status = '100,200';
                        break;
                    case 'canceled':
                        status = '250,500';
                        break;
                }


                console.log($scope.currentTab);
                OrderService.list({
                    pageNo: 1,
                    pageSize: 10,
                    status: status
                }).success(function (result) {
                    console.log(111, result);
                    if (result.result == 'true') {
                        var data = [];
                        _.each(result.data, function (order) {
                            var _order = _.clone(order);
                            _order.beginTimeStr = moment(_order.beginTime).format('YYYY-MM-DD');
                            _order.endTimeStr = moment(_order.endTime).format('YYYY-MM-DD');
                            _order.createTimeStr = moment(_order.createTime).format('YYYY-MM-DD');
                            data.push(_order);
                        });
                        $scope.orderData = data;
                        console.log(result.data);
                    }
                })
                    .error(function (result) {

                    });
            };

            $scope.switchTo($scope.currentTab);
        }
    }

})();

