angular.module('starter.controllers')
    .controller('SettlementApplyListCtrl', ['$rootScope', '$scope', '$state', '$location' , '$timeout', 'SettlementApplyListService',
        function ($rootScope, $scope, $state, $location, $timeout, SettlementApplyListService) {
            activate();
            function activate() {
                queryapplylist();
            };

            function queryapplylist() {
                var params = {
                    hotelId: $rootScope.localStorageObj.hotelId,
                    bossId: $rootScope.localStorageObj.bossId,
                };
                SettlementApplyListService.queryapplylist(params)
                    .success(function (res) {
                        if (res && res.result && res.result == "T") {
                            $scope.items = res.data;
                        } else {
                            console.log('queryapplylist == null');
                        }
                    })
                    .error(function (error) {
                        console.log('error = ' + error);
                    });
            };

            $scope.goSettlement = function goSettlement() {
                $state.go("tab.settlementApply");
            }
        }]);
