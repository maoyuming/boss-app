(function () {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('OrderDetailCtrl', OrderDetailCtrl);

  OrderDetailCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout'];

  /* @ngInject */
  function OrderDetailCtrl($rootScope, $scope, $state, $stateParams, $timeout) {
    var vm = this;
    vm.title = 'OrdersDetailCtrl';

    $scope.currentTab = 'all';
    $scope.orderData = [];
    $scope.switchTo = function (tabName) {
      $scope.currentTab = tabName;
    };
    $scope.switchTo($scope.currentTab);
  }

})();

