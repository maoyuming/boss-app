angular.module('starter.controllers')
    .controller('SettlementDetailCtrl', ['$rootScope', '$scope', '$state', '$location', '$stateParams', 'SettlementDetailService',
        function ($rootScope, $scope, $state, $location, $stateParams, SettlementDetailService) {
            activate();
            function activate() {
                queryfeedetail();

            };
            function queryfeedetail() {
                var feetype = $stateParams.feetype;
                var params = {
                    hotelId: $rootScope.localStorageObj.hotelId,
                    bossId: $rootScope.localStorageObj.bossId,
                    feeType: feetype
                };
                SettlementDetailService.bossScFeeDetail(params)
                    .success(function (res) {
                        if (res && res.result && res.result == "T") {
                            $scope.feetypedesc = res.data.feetypedesc;
                            $scope.items = res.data.items;
                        } else {
                            console.log('feedetail == null');
                        }
                    })
                    .error(function (error) {
                        console.log('error = ' + error);
                    });
            };


            $scope.goSettlement = function goSettlement() {
                $state.go("tab.settlement");
            }
        }]);
