/**
 * Created by jnduan on 16/6/18.
 */
(function () {
  'use strict';

  angular
    .module('dtk.search')
    .controller('SearchCtrl', SearchCtrl);

  SearchCtrl.$inject = ['$scope', '$rootScope','$http', '$timeout', '$state', 'SearchService'];

  /* @ngInject */
  function SearchCtrl($scope, $rootScope,$http, $timeout, $state, SearchService) {
    var vm = this;
    vm.title = 'SearchCtrl';
    activate();

    ////////////////

    function activate() {
      console.log('SearchCtrl.activate');
      
      $scope.gotoPage = function (to) {
        $timeout(function () {
          $scope.keyword = '';
          $state.go(to);
        }, 150);
      };

      $scope.doSearch = function (keyword) {
        console.log('SearchCtrl.doSearch');



        var params = {
          page:1,// 当前页(非必填 默认1)
          pagesize:1,// 每页分页数(非必填 默认10)
          range:null,// 搜索范围(非必填 默认5000m)
          businessType:null,// 标签业务类型(非必填 meal:饮食 journey:游记 sight:景点 hotel:农家院)
          tagJson:null,// 标签(非必填 {"taggroup_2":["商务会议","温泉度假"],"taggroup_1":["旅游景区"]})
          longitude:null,   // 经度(非必填)
          latitude:null,    //纬度(非必填)
          hotelName:keyword,   //农家院名字(非必填)
          isvisible:null,   //是否上线(非必填 T上线 F下线)
          hotelPhone:null,  //联系电话(非必填)
          qtPhone:null,     //前台电话(非必填)
          provinceCode:null, //省编码(非必填)
          cityCode:null,     //市编码(非必填)
          districtCode:null, //区县编码(非必填)
          sortby:null,       //排序字段(非必填)
          sortorder:null     // 升序还是降序(非必填 默认升序ASC)
        };

        SearchService.doSearch(params).success(function (res) {
          if (res && res.result && res.result == "T") {
            var _data = res.data;
            if (res.result == 'T') {
              $scope.result = _data;
              for(var i=0; i<res.data.length; i++){
                var obj = $scope.result[i];
                //格式化酒店图片
                SearchService.formatPic($scope.result[i]);
              }
              $scope.isShowSubChannels = false;
            }
          } else {
            console.log('feedetail == null');
          }
        })
          .error(function (error) {

            console.log('error = ' + error);
          });

      };


      $scope.selectHotel = function(hotel){
        $rootScope.openRegistModal();
        $rootScope.login.hotelId = hotel.hotelId;
        $rootScope.login.hotelName = hotel.hotelName;
      };
      $scope.selectMyHotel = function(keyword){

        console.log('SearchCtrl.selectMyHotel');
        $rootScope.openRegistModal();
        $rootScope.login.hotelId = null;
        $rootScope.login.hotelName = keyword;
      };
    }
  }

})();

