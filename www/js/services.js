(function () {
  angular.module('starter.services')
    .service('DtkHttp', DtkHttp)

  DtkHttp.$inject = ['$rootScope', '$http', '$q'];
  console.log("加载DtkHttp");

  /**
   * Http请求
   */
  function DtkHttp($rootScope, $http, $q) {
    /*    var isLogin = function(result) {
     if (result && !result.success && result.errCode === 'NO_AUTHENTICATION') {
     var loginInfo = Login.getLoginInfo();
     if (loginInfo && loginInfo.token) {
     $rootScope.localStorageObj = loginInfo;
     $rootScope.localStorageObj.expired = true;
     Login.setLoginInfo($rootScope.localStorageObj);
     }

     $rootScope.autoLoginFunc();
     }
     };*/
    //cservice.duantuke.cc
    var contextPath = "http://bservice.duantuke.cc";
    //var contextPath = "http://100.100.100.43:8081";
    return {
        post: function (url, params) {
            var token = '';
            if (LoginInfo && LoginInfo.getLoginInfo() && LoginInfo.getLoginInfo().token) {
                token = LoginInfo.getLoginInfo().token;
            }
            url = contextPath + url;
            var deferred = $q.defer();
            return $http.post(url, params, {timeout: 10000, headers: {token: token}})
                .success(function (result) {
                    //isLogin(error);
                    deferred.resolve(result);
                })
                .error(function (error) {
                    //isLogin(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        },

      get: function (url) {
        url = Settings.Context.path + url;
        if (url.indexOf('?') > 0) {
          url += '&token=' + token;
        } else {
          url += '?token=' + token;
        }
        var deferred = $q.defer();
        return $http.get(url)
          .success(function (result) {
            //isLogin(result);
            deferred.resolve(result);
          })
          .error(function (error) {
            //isLogin(error);
            deferred.reject(error);
          });
        return deferred.promise;
      }
    };
  }

})();




/*.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});*/
