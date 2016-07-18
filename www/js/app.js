// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'dtk.order', 'dtk.home', 'ngCordova','dtk.message'])

    .run(function ($rootScope, $state, $ionicPlatform, $ionicModal, $timeout, $cordovaToast, MessageService, UserService) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        /*****************************系统登录 modal - start**********************************/
        $rootScope.localStorageObj = {
        };

        //注册界面
        $ionicModal.fromTemplateUrl('templates/modal/regist.html', {
            scope: $rootScope,
            animation: 'slide-in-up',
            hardwareBackButtonClose: false,
            id: "login"
        }).then(function (modal) {
            $rootScope.registModal = modal;
        });
        $rootScope.openRegistModal = function () {
            $rootScope.registModal.show();
        };
        $rootScope.closeRegistModal = function () {
            $rootScope.registModal.hide();
        };

        //登录界面
        $ionicModal.fromTemplateUrl('templates/modal/login-modal.html', {
            scope: $rootScope,
            animation: 'slide-in-up',
            hardwareBackButtonClose: false,
            id: "login"
        }).then(function (modal) {
            $rootScope.loginModal = modal;

            //校验是否登录该系统
            $rootScope.localStorageObj = LoginInfo.getLoginInfo();
            if (!$rootScope.localStorageObj) {
                $rootScope.openLoginModal();
            }
        });
        $rootScope.openLoginModal = function () {
            $rootScope.loginModal.show();
        };
        $rootScope.closeLoginModal = function () {
            $rootScope.loginModal.hide();

        };
        //登录系统
        $rootScope.login = {
            showCodeBtn: true,
            loginname: $rootScope.localStorageObj ? $rootScope.localStorageObj.loginname : null,
            timer: 119,
            loginname: "13301360605",
            verifycode: "",
            salePhone: "",
            hotelName: "",
            sendCode4Phone: function () {
                //发送验证码
                var that = this;
                if (!Tools.isMobileNo($rootScope.login.loginname)) {
                    console.log('手机号码输入不合法');
                    return;
                }
                var params = {
                    phone: $rootScope.login.loginname
                }
                MessageService.messageVerifyCodeSend(params)
                    .then(function (res) {
                        if (res && res.data && res.data.result == 'T') {
                            that.showCodeBtn = false;
                            that.showTimer();
                        } else {
                            var errorMessage = res.data.errorMessage ? res.data.errorMessage : "发送验证码失败";
                            $cordovaToast.showLongBottom(errorMessage);
                        }
                    }, function (error) {
                        $cordovaToast.showLongBottom('发送验证码失败');
                    });
            },
            showTimer: function () {
                var that = this;
                $timeout(function () {
                    if (that.timer > 0) {
                        that.timer--;
                        that.showTimer();
                    } else {
                        that.timer = 119;
                        that.showCodeBtn = true;
                    }
                }, 1000);
            },

            //跳转到注册页面
            forwardRegist: function () {
                $rootScope.closeLoginModal();
                $rootScope.openRegistModal();
            },
            //注册系统
            regist: function () {
                var submitResult = false;//提交成功或者失败
                var params = {
                    phone: $rootScope.login.loginname,
                    verifycode: $rootScope.login.verifycode,
                    salePhone: $rootScope.login.salePhone,
                    hotelName: $rootScope.login.hotelName
                }
                //注册
                UserService.userRegister(params)
                    .then(function (res) {
                        console.log('res = ' + res);
                        if (res && res.data && res.data.result == 'T') {
                            submitResult = true;
                        } else {
                            submitResult = false;
                            var errorMessage = res.errorMessage ? res.errorMessage : "注册失败";
                            $cordovaToast.showLongBottom(errorMessage);
                        }
                    }, function (error) {
                        submitResult = false;
                        $cordovaToast.showLongBottom('提交验证码失败');
                    })
                    .then(function () {
                        if (submitResult) {
                            //获取token
                            var params = {
                                phone: $rootScope.login.loginname
                            }
                            UserService.userGentoken(params)
                                .then(function (res) {
                                    if (res && res.data && res.data.result == 'T') {
                                        $rootScope.localStorageObj = {
                                            token: res.data.data
                                        }
                                        LoginInfo.setLoginInfo($rootScope.localStorageObj);
                                        $rootScope.closeRegistModal();
                                    } else {
                                        var errorMessage = res.errorMessage ? res.errorMessage : "获取用户凭证失败";
                                        $cordovaToast.showLongBottom(errorMessage);
                                    }
                                }, function (error) {
                                    $cordovaToast.showLongBottom('获取用户凭证失败');
                                });
                        } else {
                            console.log('不能获取token');
                        }
                    }, function (error) {
                        $cordovaToast.showLongBottom('提交验证码失败');
                    });
            },
            //登录系统
            submit: function () {
                var submitResult = false;//提交成功或者失败
                var params = {
                    phone: $rootScope.login.loginname,
                    verifycode: $rootScope.login.verifycode
                }
                //登录(需要返回一个是不是已经注册过了)
                MessageService.messageVerifyCodeVerify(params)
                    .then(function (res) {
                        console.log('res = ' + res);
                        if (res && res.data && res.data.result == 'T') {
                            submitResult = true;
                        } else {
                            submitResult = false;
                            var errorMessage = res.errorMessage ? res.errorMessage : "提交验证码失败";
                            $cordovaToast.showLongBottom(errorMessage);
                        }
                    }, function (error) {
                        submitResult = false;
                        $cordovaToast.showLongBottom('提交验证码失败');
                    })
                    .then(function () {
                        if (submitResult) {
                            //获取token
                            var params = {
                                phone: $rootScope.login.loginname
                            }
                            UserService.userGentoken(params)
                                .then(function (res) {
                                    if (res && res.data && res.data.result == 'T') {
                                        $rootScope.localStorageObj = {
                                            token: res.data.data
                                        }
                                        LoginInfo.setLoginInfo($rootScope.localStorageObj);

                                        UserService.hotelList(res.data.data)
                                            .success(function (res) {
                                                var hotelId = res.data[0].hotelId;
                                                var hotelName = res.data[0].hotelName;
                                                $rootScope.localStorageObj = LoginInfo.getLoginInfo();
                                                $rootScope.localStorageObj.hotelId = hotelId;
                                                $rootScope.localStorageObj.hotelName = hotelName;
                                                LoginInfo.setLoginInfo($rootScope.localStorageObj);

                                                UserService.getLoginUser()
                                                    .success(function (res) {
                                                        $rootScope.localStorageObj = LoginInfo.getLoginInfo();
                                                        $rootScope.localStorageObj.bossId = res.data.bossId;
                                                        $rootScope.localStorageObj.phone = res.data.phone;
                                                        LoginInfo.setLoginInfo($rootScope.localStorageObj);
                                                        $state.go("tab.home");
                                                        $rootScope.$broadcast('home_refresh');
                                                        $rootScope.closeLoginModal();
                                                    });
                                            })
                                            .error(function (error) {
                                                console.log('error = ' + error);
                                            });


                                    } else {
                                        var errorMessage = res.errorMessage ? res.errorMessage : "获取用户凭证失败";
                                        $cordovaToast.showLongBottom(errorMessage);
                                    }
                                }, function (error) {
                                    $cordovaToast.showLongBottom('获取用户凭证失败');
                                });
                        } else {
                            console.log('不能获取token');
                        }
                    }, function (error) {
                        $cordovaToast.showLongBottom('提交验证码失败');
                    });
            }
        };
        /*****************************系统登录modal - end **********************************/
    })

    .config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider, $httpProvider) {

        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.icon('ion-android-arrow-back');

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })

            .state('tab.orders', {
                url: '/orders',
                views: {
                    'tab-orders': {
                        templateUrl: 'templates/tab-orders.html',
                        controller: 'OrdersCtrl'
                    }
                }
            })
            .state('tab.orderDetail', {
                url: '/order/:orderId',
                views: {
                    'tab-orders': {
                        templateUrl: 'templates/order/order-detail.html',
                        controller: 'OrderDetailCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.settlement', {
                url: '/settlement',
                views: {
                    'tab-settlement': {
                        templateUrl: 'templates/tab-settlement.html',
                        controller: 'SettlementCtrl'
                    }
                }
            })
            .state('tab.settlementApply', {
                url: '/settlement/apply',
                views: {
                    'tab-settlement': {
                        templateUrl: 'templates/settlement/settlement-apply.html',
                        controller: 'SettlementApplyCtrl'
                    }
                }
            })

            .state('tab.settlementApplyList', {
                url: '/settlement/applyList',
                views: {
                    'tab-settlement': {
                        templateUrl: 'templates/settlement/settlement-apply-list.html',
                        controller: 'SettlementApplyListCtrl'
                    }
                }
            })
            .state('tab.settlementDetail', {
                url: '/settlement/detail/:feetype',
                views: {
                    'tab-settlement': {
                        templateUrl: 'templates/settlement/settlement-detail.html',
                        controller: 'SettlementDetailCtrl'
                    }
                }
            })
            .state('tab.my', {
                url: '/my',
                views: {
                    'tab-my': {
                        templateUrl: 'templates/tab-my.html',
                        controller: 'MyCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'MessageCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');


        // 使angular $http post提交和jQuery一致
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];

    });

angular.module('starter.controllers', []);
angular.module('starter.services', []);
angular.module('dtk.order', []);
angular.module('dtk.home', []);
angular.module('dtk.message', []);