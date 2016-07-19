/**
 * Created by jnduan on 16/6/17.
 */
(function () {
  'use strict';

  angular
    .module('dtk.search')
    .service('SearchService', SearchService);

  SearchService.$inject = ['DtkHttp'];

  function SearchService(DtkHttp) {
    return {
      /**********************es搜索接口************************/
      /**
       * es搜索接口-农家院
       * @param params
       * @returns {*}
       */
      doSearch: function (params) {
        var act = '/hotel/list';
        return DtkHttp.post(act, params);
      },

      /* 处理酒店数据 */
      formatPic:function(hotel) {
      //格式化酒店图片
      var hotelPics = JSON.parse(hotel.pics);
      //图片数组
      var pics = [];
      //循环图片数组取数据
      for(var i in hotelPics){
        //取出每个pic的数组
        var _thisPic = hotelPics[i].pic;
        //追加到pics数组中
        pics = pics.concat(_thisPic);
      }
      //赋值
      hotel.pics = pics;
    },
      
    };
  }
})();


