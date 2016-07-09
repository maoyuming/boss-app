angular.module('starter.controllers')
  .controller('SettlementCtrl', ['$rootScope','$scope', '$state','$location' ,'$timeout','SettlementService',
              function ($rootScope,$scope, $state,$location,$timeout,SettlementService) {
      activate();
      function activate(){
        var params = {
          hotelId: $state.hotelId,
          bossId:$state.bossId
        };
        SettlementService.bossScBalance(params)
          .success(function (res) {
            if(res && res.result && res.result == "T"){
              $scope.balance = 100;
            }else{
              console.log('balance == null');
            }
          })
          .error(function (error) {
            console.log('error = ' + error);
          });
      }
      //function querybalance(){
      //  var params = {
      //    hotelId: $state.hotelId,
      //    bossId:$state.bossId
      //  };
      //  SettlementService.bossScBalance(params)
      //    .success(function (res) {
      //      if(res && res.result && res.result == "T"){
      //        $scope.balance = 100;
      //      }else{
      //        console.log('balance == null');
      //      }
      //    })
      //    .error(function (error) {
      //      console.log('error = ' + error);
      //    });
      //}

      $scope.gotoPage = function (to) {
        $timeout(function () {
          $state.go(to);
        }, 150);
      };

  }]);
