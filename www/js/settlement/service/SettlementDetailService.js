(function () {
  'use strict';

  angular
    .module('starter.services')
    .service('SettlementDetailService', SettlementDetailService);

  SettlementDetailService.$inject = ['DtkHttp'];

  function SettlementDetailService(DtkHttp) {
    return {
      /**********************结算接口************************/
      /**
       * 查询收支详情
       * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
       Long bossId 老板id
       Long hotelId 酒店id
       Integer feeType 收支类型
       * @returns {*}
       */
      bossScFeeDetail    : function (params) {
        var act = '/boss/sc/items';
        return DtkHttp.post(act, params);
      }
    };

  }
})();


