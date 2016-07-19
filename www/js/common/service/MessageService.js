/**
 * 点赞服务
 */
(function () {
    'use strict';

    angular
        .module('starter.services')
        .service('MessageService', MessageService);

    MessageService.$inject = ['DtkHttp'];

    function MessageService(DtkHttp) {
        return {

            /**********************消息发送验证接口************************/
            /**
             * 发送短信
             * @param params message:短信内容 phone:手机号码
             * @returns {*}
             */
            messageSend: function (params) {
                var act = '/message/send';
                return DtkHttp.post(act, params);
            },

            /**
             * 发送短信验证码
             * @param params phone:手机号码
             * @returns {*}
             */
            messageVerifyCodeSend: function (params) {
                var act = '/message/verifycode/send';
                return DtkHttp.post(act, params);
            },
            /**
             * 验证短信接口
             * @param params phone:手机号码  verifycode:验证码
             * @returns {*}
             */
            messageVerifyCodeVerify: function (params) {
                var act = '/message/verifycode/verify';
                return DtkHttp.post(act, params);
            },
            /**
             * 登录接口
             * @param params phone:手机号码  verifycode:验证码
             * @returns {*}
             */
            messageLogin: function (params) {
                var act = '/message/login';
                return DtkHttp.post(act, params);
            },
            /**
             * 消息列表接口
             * @param params phone:手机号码  verifycode:验证码
             * @returns {*}
             */
            messageList: function (params) {
                var act = '/boss/message/list';
                return DtkHttp.post(act, params);
            }
        };
    }
})();


