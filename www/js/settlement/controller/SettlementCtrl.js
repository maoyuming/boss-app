angular.module('starter.controllers')
    .controller('SettlementCtrl', ['$rootScope', '$scope', '$state', '$location' , '$timeout', 'SettlementService',
        function ($rootScope, $scope, $state, $location, $timeout, SettlementService) {
            activate();
            function activate() {
                querybalance();
                queryfeetypes();
            };
            //查询余额
            function querybalance() {
                var params = {
                    hotelId: $rootScope.localStorageObj.hotelId,
                    bossId: $rootScope.localStorageObj.bossId
                };
                SettlementService.bossScBalance(params)
                    .success(function (res) {
                        if (res && res.result && res.result == "T") {
                            $scope.balance = res.data;
                        } else {
                            console.log('balance == null');
                        }
                    })
                    .error(function (error) {
                        console.log('error = ' + error);
                    });
            };
            //查询收支类型列表
            function queryfeetypes() {
                SettlementService.queryfeetypes()
                    .success(function (res) {
                        if (res && res.result && res.result == "T") {
                            $scope.feetypes = res.data;
                        } else {
                            console.log('feetypes.length == null');
                        }
                    })
                    .error(function (error) {
                        console.log('error = ' + error);
                    });
            }

            $scope.gotoPage = function (to) {
                $timeout(function () {
                    $state.go(to);
                }, 150);
            };

        }]);
