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

        var tabNames = ['toBeConfirmed', 'toDay', 'future', 'history'];

        activate();

        function activate() {
            $scope.status = '30';
            $scope.currentTab = 'toBeConfirmed';
            $scope.orderData = [];
            $scope.switchTo = function (tabName) {
                if (!LoginInfo.getLoginInfo()) {
                    $rootScope.openLoginModal.call(null);
                }

                var idx = _.find(tabNames, function (_name) {
                    return _name == tabName
                });
                if (!idx) {
                    tabName = 'toBeConfirmed';
                }
                $scope.currentTab = tabName;

                function clear(){
                    $scope.status = '';
                    $scope.beginTime = '';
                    $scope.endTime = '';
                }

                switch (tabName) {
                    case 'toBeConfirmed':
                        clear();
                        $scope.status = '30';
                        break;
                    case 'toDay':
                        clear();
                        $scope.status = '50';
                        $scope.beginTime = moment().format('YYYY-MM-DD');
                        break;
                    case 'future':
                        clear();
                        $scope.status = '50';
                        $scope.beginTime = moment().add('days',1).format('YYYY-MM-DD');
                        break;
                    case 'history':
                        clear();
                        $scope.status = '200';
                        break;
                }
                console.log($scope.currentTab);
                $scope.orders.refresh();
            };
        }

        //查询订单更多
        $scope.orders = {
            page: {
                pageNo: 0,
                pageSize: 10,
                total: 0
            },
            loaded: false,
            data: [],
            loadData: function () {
                var _this = this;
                var params = {
                    pageNo: _this.page.pageNo,// 当前页(非必填 默认1)
                    pageSize: 10,// 每页分页数(非必填 默认10)
                    hotelId:  $rootScope.localStorageObj.hotelId,
                    status: $scope.status,
                    beginTime: $scope.beginTime,
                    endTime: $scope.endTime
                };

                OrderService.list(params)
                    .success(function (res) {
                        if (res && res.result) {
                            var b = _this.page.pageNo;
                            var _data = res.data;

                            var data = [];
                            _.each(_data, function (order) {
                                var _order = _.clone(order);
                                _order.beginTime = moment(_order.beginTime).format('YYYY-MM-DD');
                                _order.endTime = moment(_order.endTime).format('YYYY-MM-DD');
                                _order.orderStatus =  orderStatusTranslate (_order.status);
                                _order.paystatus =  payStatusTranslate (_order.payStatus);
                                _order.orderType =  orderTypeTranslate (_order.flag);
                                data.push(_order);
                            });
                            _data = data;

                            if (!_data || _data.length <= 0) {
                                if (_this.data.length <= 0) {
                                    _this.page.total = 0;
                                }
                                _this.moreDataCanBeLoaded = false;
                                //$cordovaToast.showShortBottom('已加载到尾页');
                                return;
                            } else if (_data.length == _this.page.pageSize) {
                                _this.moreDataCanBeLoaded = true;
                            }
                            _this.data = _this.data.concat(_data);
                            _this.page.total = 100;//res.total;
                        } else {
                            _this.page.total = 0;
                            console.log('加载失败');
                        }
                    }).error(function (error) {
                        console.log(error);
                    }).finally(function () {
                        _this.loaded = true;
                        if (_this.data.length < _this.page.pageSize) {
                            _this.moreDataCanBeLoaded = false;
                        }
                        $scope.$broadcast('scroll.refreshComplete');
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            },
            moreDataCanBeLoaded: true,
            loadMore: function () {
                this.page.pageNo++;
                this.loadData();
            },
            refresh: function () {
                var _this = this;
                _this.page.pageNo = 1;
                _this.loadData(function () {
                    _this.data = [];
                }());
            }
        };

        $scope.gotoOrderDetail = function gotoOrderDetail(orderId){
            $state.go("tab.orderDetail",{orderId:orderId});
        }
    };

})();

