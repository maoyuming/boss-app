angular.module('starter.controllers')
  .controller('MyCtrl', ['$rootScope','$scope', '$state','$location' ,
              function ($rootScope,$scope, $state,$location) {
    console.log("MyCtrl")
  }]);
