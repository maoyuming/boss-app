(function () {
    'use strict';

    angular
        .module('dtk.home')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'OrderService', "SettlementService"];

    /* @ngInject */
    function HomeCtrl($rootScope, $scope, $state, $stateParams, $timeout, OrderService, SettlementService) {
            init();
            function init() {
                if ($rootScope.localStorageObj) {
                    getCount(50, moment().format('YYYY-MM-DD'));
                    getCount(30, '');
                    getBalanceAmount();
                    $scope.home = {
                        hotelName: $rootScope.localStorageObj.hotelName
                    };
                }
            }

            $scope.$on('home_refresh', function () {
                init();
            })


            function getCount(status, time) {
                var params = {
                    hotelId: $rootScope.localStorageObj.hotelId,
                    status: status,
                    beginTime: time
                };

                OrderService.getOrderNum(params)
                    .success(function (result) {
                        if (status == 50) {
                            $scope.home.todayCount = result.data
                        } else {
                            $scope.home.toBeConfirmedCount = result.data
                        }
                    })
                    .error(function (result) {
                        console.log(result);
                    }
                );
            }


            function getBalanceAmount() {
                var params = {
                    hotelId: $rootScope.localStorageObj.hotelId,
                    bossId: $rootScope.localStorageObj.bossId
                };

                SettlementService.bossScBalance(params)
                    .success(function (res) {
                        if (res && res.result && res.result == "T") {
                            $scope.home.amount = res.data;
                        } else {
                            console.log('balance == null');
                        }
                    })
                    .error(function (error) {
                        console.log('error = ' + error);
                    });
            }


            $scope.goToBeConfirmed = function goToBeConfirmed() {
                $state.go("tab.orders");
            }

            $scope.goTodayOrderPage = function goTodayOrderPage() {
                $state.go("tab.orders");
            }

            $scope.goSettlement = function goSettlement() {
                $state.go("tab.settlement");
            }

            $scope.goSettlementApply = function goSettlementApply() {
                $state.go("tab.settlementApply");
            }

            $scope.goChatList = function goChatList() {
                $state.go("tab.chat");
            }
            $scope.doRefresh = function () {
                $state.reload();
            };

        }
})();

