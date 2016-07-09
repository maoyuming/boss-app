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
                    case 'toBeConfirmed':
                        status = '30';
                        break;
                    case 'toDay':
                        status = '0';
                        break;
                    case 'Future':
                        status = '100,200';
                        break;
                    case 'history':
                        status = '250,500';
                        break;
                }


                console.log($scope.currentTab);
                /*   OrderService.list({
                 pageNo: 1,
                 pageSize: 10,
                 hotelId: 869,
                 status: status
                 }).success(function (result) {
                 console.log(111, result);
                 if (result.result == 'true') {
                 var data = [];
                 _.each(result.data, function (order) {
                 var _order = _.clone(order);
                 */
                /*                _order.beginTimeStr = moment(_order.beginTime).format('YYYY-MM-DD');
                 _order.endTimeStr = moment(_order.endTime).format('YYYY-MM-DD');
                 _order.createTimeStr = moment(_order.createTime).format('YYYY-MM-DD');*/
                /*
                 data.push(_order);
                 });
                 $scope.orderData = data;
                 console.log(result.data);
                 }
                 })
                 .error(function (result) {

                 });*/
            };

            $scope.switchTo($scope.currentTab);
        }


        //查询订单更多
        $scope.orders = {
            search: {
                filter: {

                },
                doAct: function () {
                    if (this.timer) {
                        $timeout.cancel(this.timer);
                    }
                    this.timer = $timeout(function () {
                        $scope.orders.refresh();
                    }, 500);
                }
            },
            page: {
                pageNo: 1,
                pageSize: 10,
                total: 0
            },
            loaded: false,
            data: [],
            loadData: function (okFunc) {
                var _this = this;
                var params = {
                    pageNo: 1,// 当前页(非必填 默认1)
                    pageSize: 10,// 每页分页数(非必填 默认10)
                    hotelId:  $rootScope.localStorageObj.hotelId,
                    status: status
                };

                OrderService.list(params)
                    .success(function (res) {
                        if (res && res.result) {
                            var _data = res.data;

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
                });
            }
        };

        $scope.gotoOrderDetail = function gotoOrderDetail(orderId){
            $state.go("tab.orderDetail",{orderId:orderId});
        }
    };

})();

