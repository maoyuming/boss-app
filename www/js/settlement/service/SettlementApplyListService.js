(function () {
    'use strict';

    angular
        .module('starter.services')
        .service('SettlementApplyListService', SettlementApplyListService);

    SettlementApplyListService.$inject = ['DtkHttp'];

    function SettlementApplyListService(DtkHttp) {
        return {
            /**
             * 查询提现申请进度
             * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
             Long bossId 老板id
             Long hotelId 酒店id
             * @returns {*}
             */
            queryapplylist: function (params) {
                var act = '/boss/sc/withdrawl/status';
                return DtkHttp.post(act, params);
            }
        };

    }
})();


