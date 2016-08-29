'use strict';

/**
 * @ngdoc directive
 * @name directive:automiddle
 * @description
 * # automiddle
 */
angular.module('sbAdminApp')
    .directive('autoMiddle',function(){
        return {
            restrict: 'A',
            link: function($scope, el, attrs) {
                var winH = angular.element(window).height();
                var elemH = angular.element(el).height();

                var marginTop = (winH - elemH) /2;
                angular.element(el).css({ 'margin-top': marginTop + 'px' });
            }
        }
    });
