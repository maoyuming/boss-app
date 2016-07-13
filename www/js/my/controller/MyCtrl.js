angular.module('starter.controllers')
  .controller('MyCtrl', ['$rootScope','$scope', '$state','$location' ,'$ionicModal',
              function ($rootScope,$scope, $state,$location,$ionicModal) {

      //退出登录
      $scope.logout = function(){
        LoginInfo.rm();//删除用户缓存
        $rootScope.openLoginModal();
      }

      //修改
      $ionicModal.fromTemplateUrl('templates/modal/modify-my-phone-modal.html', {
        scope: $rootScope,
        animation: 'slide-in-up',
        hardwareBackButtonClose: false,
        id: "login"
      }).then(function (modal) {
        $rootScope.modifyMyPhoneModal = modal;
      });
      $rootScope.openModifyMyPhoneModal = function () {
        $rootScope.modifyMyPhoneModal.show();
      };
      $rootScope.closeModifyMyPhoneModal = function () {
        $rootScope.modifyMyPhoneModal.hide();
      };

      //保存我的手机
      $scope.my = {
        hotelName:$rootScope.localStorageObj.hotelName,
        phone:$rootScope.localStorageObj.phone,
        //保存
        saveMyPhone : function(){
          $rootScope.closeModifyMyPhoneModal();
        }
      }
  }]);
