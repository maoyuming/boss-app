angular.module('starter.controllers')
  .controller('SettlementDetailCtrl', ['$rootScope','$scope', '$state','$location', '$stateParams','SettlementDetailService',
              function ($rootScope,$scope, $state,$location,$stateParams,SettlementDetailService) {
                activate();
                function activate(){
                  queryfeedetail();

                };
                function queryfeedetail() {
                  var feetype = $stateParams.feetype;
                  var params = {
                    hotelId: 1,//$state.hotelId,
                    bossId: 1,//$state.bossId
                    feeType:feetype
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

  }]);
