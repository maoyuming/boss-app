angular.module('starter.controllers')
    .controller('MyCtrl', ['$rootScope','$window', '$ionicHistory','$scope', '$state', '$location' , '$ionicModal',
        function ($rootScope,$window,$ionicHistory, $scope, $state, $location, $ionicModal) {

            //退出登录
            $scope.logout = function () {
                LoginInfo.rm();//删除用户缓存
                $window.localStorage.clear();
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $rootScope.openLoginModal();
            }

            //修改
/*            $ionicModal.fromTemplateUrl('templates/modal/modify-my-phone-modal.html', {
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
            };*/



/*            $scope.$on('my_refresh', function () {
                init();
            })*/

            init();
            function init() {
                //保存我的手机
                if ($rootScope.localStorageObj) {
                    $scope.my = {
                        hotelName: $rootScope.localStorageObj.hotelName,
                        phone: $rootScope.localStorageObj.phone,
                        saveMyPhone: function () {
                            $rootScope.closeModifyMyPhoneModal();
                        }
                    }
                }
                $state.reload();
            }
        }]);
