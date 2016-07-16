(function () {
    'use strict';

    angular
        .module('dtk.message')
        .controller('MessageCtrl', MessageCtrl);

    MessageCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'MessageService'];

    /* @ngInject */
    function MessageCtrl($rootScope, $scope, $state, $stateParams, $timeout,MessageService) {
        //查询订单更多
        $scope.chats = {
            page: {
                pageNo: 0,
                pageSize: 10,
                total: 0
            },
            loaded: false,
            data: [],
            loadData: function () {
                var _this = this;
                var params = {
                    index: _this.page.pageNo,// 当前页(非必填 默认1)
                    pageSize: 10,// 每页分页数(非必填 默认10)
                    bossId: $rootScope.localStorageObj.bossId
                };

                MessageService.messageList(params)
                    .success(function (res) {

                        if (res && res.result) {
                            var b = _this.page.pageNo;
                            var _data = res.data;
                            console.log(_data.length+"dddddddd");
                            if (!_data || _data.length <= 0) {
                                if (_this.data.length <= 0) {
                                    _this.page.total = 0;
                                }
                                _this.moreDataCanBeLoaded = false;
                                return;
                            } else if (_data.length == _this.page.pageSize) {
                                _this.moreDataCanBeLoaded = true;
                            }
                            _this.data = _this.data.concat(_data);
                            _this.page.total = 100;//res.total;
                        } else {
                            _this.page.total = 0;
                            console.log('加载失败');
                        }
                    }).error(function (error) {
                        console.log(error);
                    }).finally(function () {
                        _this.loaded = true;
                        if (_this.data.length < _this.page.pageSize) {
                            _this.moreDataCanBeLoaded = false;
                        }
                        $scope.$broadcast('scroll.refreshComplete');
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            },
            moreDataCanBeLoaded: true,
            loadMore: function () {
                this.page.pageNo++;
                this.loadData();
            },
            refresh: function () {
                var _this = this;
                _this.page.pageNo = 1;
                _this.loadData(function () {
                    _this.data = [];
                }());
            }
        };

        messageList();
        function messageList() {
            $scope.chats.refresh();
        }
    };
})();

