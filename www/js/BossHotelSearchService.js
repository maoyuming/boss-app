/**
 * 点赞服务
 */
(function () {
  'use strict';

  angular
    .module('starter.bossHotelSearchService')
    .service('BossHotelSearchService', BossHotelSearchService);

  LikeService.$inject = ['DtkHttp'];

  function BossHotelSearchService(DtkHttp) {
    return {
      /**********************查询老板下的酒店信息************************/
      /**
       * 查询老板下的酒店信息
       * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
       * @returns {*}
       */
      bossHotelList   : function (params) {
        var act = '/boss/hotel/list';
        return DtkHttp.post(act, params);
      },
      /**
       * 查询老板酒店详情
       * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
                       body:
                       hotelId //酒店id
       * @returns {*}
       */
      bossHotelDetail : function (params) {
        var act = '/boss/hotel/detail';
        return DtkHttp.post(act, params);
      },

      /**
       * 查询老板消息列表
       * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
       * @returns {*}
       */
      bossMessageList  : function (params) {
        var act = '/boss/message/list';
        return DtkHttp.post(act, params);
      },

      /**
       * 查询老板信息
       * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
       * @returns {*}
       */
      bossUserQuery  : function (params) {
        var act = 'boss/user/query';
        return DtkHttp.post(act, params);
      },

      /*****************************更新用户下酒店信息***************************************/
      /**
       * 查询老板信息
       * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
       *               http body:
                       hotelId:酒店id ，必填
                       longitude：经度
                       latitude：维度
       * @returns {*}
       */
        bossHotelSaveHotel   : function (params) {
          var act = 'boss/hotel/saveHotel';
          return DtkHttp.post(act, params);
        }
    };

  }
})();


