angular.module('starter.controllers')
  .controller('SettlementCtrl', ['$rootScope','$scope', '$state','$location' ,'$timeout',
              function ($rootScope,$scope, $state,$location,$timeout) {
    console.log("SettlementCtrl");

      $scope.gotoPage = function (to) {
        $timeout(function () {
          $state.go(to);
        }, 150);
      };
  }]);
