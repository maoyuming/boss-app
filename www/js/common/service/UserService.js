/**
 * 点赞服务
 */
(function () {
    'use strict';

    angular
        .module('starter.services')
        .service('UserService', UserService);

    UserService.$inject = ['DtkHttp'];

    function UserService(DtkHttp) {
        return {
            /**********************用户注册，token，登录************************/
            /**
             * 注册用户接口
             * @param params phone:手机号码
             verifycode:验证码
             salePhone：销售电话
             hotelName：酒店名称
             hotelId：酒店id
             ps:hotelName和hotelId二选一，hotelId优先
             * @returns {*}
             */
            userRegister: function (params) {
                var act = '/user/register';
                return DtkHttp.post(act, params);
            },
            /**
             * 生成token接口
             * @param params phone=186111111111
             * @returns {*}
             */
            userGentoken: function (params) {
                var act = '/user/gentoken';
                return DtkHttp.post(act, params);
            },
            /**
             * 查询待领取的酒店详情（注册老板账号时使用）
             * @param params hotelId //酒店id
             * @returns {*}
             */
            hotelDetail: function (params) {
                var act = '/hotel/detail';
                return DtkHttp.post(act, params);
            },

            /**
             * 查询待领取的酒店（注册老板账号时使用）
             * @returns {*}
             */
            hotelList: function (params) {
                var act = '/boss/hotel/list';
                return DtkHttp.post(act, params);
            },
            /**
             * 老板登陆信息
             * @returns {*}
             */
            getLoginUser: function () {
                var act = '/boss/user/query';
                return DtkHttp.post(act, null);
            }

        };

    }
})();


