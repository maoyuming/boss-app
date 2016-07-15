(function () {
    'use strict';

    angular
        .module('starter.services')
        .service('SettlementApplyService', SettlementApplyService);

    SettlementApplyService.$inject = ['DtkHttp'];

    function SettlementApplyService(DtkHttp) {
        return {
            /**********************结算接口************************/
            /**
             * 申请提现
             * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
             Long bossId 老板id
             Long hotelId 酒店id
             BigDecimal sum 提现金额
             Integer transferWay 体现方式(支付宝:1 微信:2 银行转账:3 不填默认为银行转账)
             * @returns {*}
             */
            applywithdraw: function (params) {
                var act = '/boss/sc/withdrawl ';
                return DtkHttp.post(act, params);
            }
        };

    }
})();


