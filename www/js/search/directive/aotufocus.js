/**
 * Created by jnduan on 16/6/16.
 */
angular.module('dtk.search')
  .directive('autoFocus', function($timeout) {
    return {
      restrict: 'A',
      require: '^ionNavView',
      link: function(scope, element, attrs, ctrl) {
        // console.log('autoFocus link');
        ctrl.scope.$on('$ionicView.afterEnter', function(event, data) {
          console.log('$ionicView.afterEnter');
          element[0].focus();
        });

      }
    };
  });
