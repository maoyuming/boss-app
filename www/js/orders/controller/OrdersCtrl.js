(function () {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('OrdersCtrl', OrdersCtrl);

  OrdersCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout'];

  /* @ngInject */
  function OrdersCtrl($rootScope, $scope, $state, $stateParams, $timeout) {
    var vm = this;
    vm.title = 'OrderListCtrl';

    $scope.gotoPage = function (to) {
      $timeout(function () {
        $state.go(to);
      }, 150);
    };

    $scope.currentTab = 'all';
    $scope.orderData = [];
    $scope.switchTo = function (tabName) {
      $scope.currentTab = tabName;
    };
    $scope.switchTo($scope.currentTab);
  }

})();

