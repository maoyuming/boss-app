(function () {
  'use strict';

  angular
    .module('starter.services')
    .service('SettlementService', SettlementService);

  SettlementService.$inject = ['DtkHttp'];

  function SettlementService(DtkHttp) {
    return {
      /**********************结算接口************************/
      /**
       * 查询账户余额
       * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
       Long bossId 老板id
       Long hotelId 酒店id
       * @returns {*}
       */
      bossScBalance    : function (params) {
        var act = '/boss/sc/balance';
        return DtkHttp.post(act, params);
      },
      /**
       * 查询收支类型列表
       */
      queryfeetypes    : function () {
        var act = '/boss/sc/allFeeTypes ';
        return DtkHttp.post(act, null);
      },
      /**
       * 发起提现申请
       * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
       Long bossId 老板id
       Long hotelId 酒店id
       BigDecimal sum 提现金额
       * @returns {*}
       */
      bossScWithdrawl  : function (params) {
        var act = '/boss/sc/withdrawl';
        return DtkHttp.post(act, params);
      },
      /**
       * 查询提现申请进度
       * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
       Long bossId 老板id
       Long hotelId 酒店id
       * @returns {*}
       */
      bossScWithdrawlStatus   : function (params) {
        var act = '/boss/sc/withdrawl/status';
        return DtkHttp.post(act, params);
      }
    };

  }
})();


