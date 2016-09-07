'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      link: function(scope, elem, attrs) {
          var height = $(window).height();
          var mtop = parseInt($(elem).css('margin-top'));
          $(elem).height(height-mtop-30);
      },
      controller:function($scope){

      }
    }
  }]);
