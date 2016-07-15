angular.module('starter.controllers')
    .controller('SettlementApplyCtrl', ['$rootScope', '$scope', '$state', '$location' , '$timeout', 'SettlementApplyService',
        function ($rootScope, $scope, $state, $location, $timeout, SettlementApplyService) {
            $scope.apply = {sum: null};
            //申请提现
            $scope.applywithdraw = function () {

                var params = {
                    hotelId: $rootScope.localStorageObj.hotelId,
                    bossId: $rootScope.localStorageObj.bossId,
                    transferWay: 3,
                    sum: $scope.apply.sum
                };
                SettlementApplyService.applywithdraw(params)
                    .success(function (res) {
                        alert(res.data);
                    })
                    .error(function (error) {
                        console.log('error = ' + error);
                    });
            };
            $scope.gotoPage = function (to) {
                $timeout(function () {
                    $state.go(to);
                }, 150);
            };
        }]);
