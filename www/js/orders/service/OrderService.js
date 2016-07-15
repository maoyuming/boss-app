(function () {
    'use strict';

    angular
        .module('dtk.order')
        .service('OrderService', OrderService);

    OrderService.$inject = ['DtkHttp'];

    function OrderService(DtkHttp) {
        return {

            /**********************支付接口************************/
            /**
             * 查询账户余额
             * @param params Long orderId,
             Integer type 1:第三方支付 2:余额支付
             Integer payChannel 1:支付宝 2:微信
             Integer feeType 费用类型 暂定1
             Long customerId 客户id
             Integer sum 支付金额 单位:分
             * @returns {*}
             */
            scPay: function (params) {
                var act = '/customer/sc/pay';
                return DtkHttp.post(act, params);
            },

            /**
             * 订单退款
             * @param params Long orderId
             * @returns {*}
             */
            scRefund: function (params) {
                var act = '/customer/sc/refund';
                return DtkHttp.post(act, params);
            },
            /**
             * 订单退款
             * @param params Long customerId
             * @returns {*}
             */
            scBalance: function (params) {
                var act = '/customer/sc/balance';
                return DtkHttp.post(act, params);
            },
            /**
             * 充值
             * @param params Integer payChannel 1:支付宝 2:微信
             Long customerId
             Integer sum 单位:分
             * @returns {*}
             */
            scRecharge: function (params) {
                var act = '/customer/sc/recharge';
                return DtkHttp.post(act, params);
            },

            /******************************创建订单*********************************/

            /**
             * 创建订单
             * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
             *                http body:  {"data":{"beginTime":1466671690544,"contact":"jjh","contactPhone":"123456","customerId":123,"endTime":1466671690544,"memo":"beizhu","orderDetails":[{"num":1,"priceDetails":[{"actionTime":1466671690547,"price":123,"skuId":789,"skuName":"商品"}],"skuId":789,"skuName":"商品","skuType":1,"totalPrice":100}],"payStatus":10,"payType":100,"promotionId":321,"status":50,"supplierId":456,"supplierName":"sky","totalPrice":100,"type":0}}
             * @returns {*}
             */
            createOrder: function (params) {
                var act = '/customer/order/create';
                return DtkHttp.post(act, params);
            },
            /**
             * 取消订单
             * @param params http header: token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
             http body: {"data":{"cancelType":0,"operatorId":"111","operatorName":"jjh","orderId":222,"reason":"reason","supplierId":333}}
             * @returns {*}
             */
            cancelOrder: function (params) {
                var act = '/customer/order/cancel';
                return DtkHttp.post(act, params);
            },

            /**
             *
             * @param params http header:
             token:Zd8H+oYcB1bGJtkxaSOjpnZ03+roT+MGMBq4dC56w0Y=
             body:
             {"pageNo":1,"pageSize":20}
             * @returns {*}
             */
            list: function (params) {
                var act = '/boss/order/list';
                return DtkHttp.post(act, params);
            },

            detail: function (params) {
                var act = '/boss/order/' + params.orderId;
                return DtkHttp.post(act);
            },

            getOrderNum: function (params) {
                var act = '/boss/order/getOrderNum';
                return DtkHttp.post(act, params);
            }

        };
    }
})();


