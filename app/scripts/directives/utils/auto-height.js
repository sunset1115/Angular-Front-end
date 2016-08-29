'use strict';

/**
 * @ngdoc directive
 * @name directive:auto-height
 * @description
 * # autoHeight
 */
angular.module('sbAdminApp')
    .directive('autoHeight',function(){
        return {
            restrict: 'A',
            link: function($scope, el, attrs) {
                $(window).bind('load resize', function() {
                    var winH = angular.element(window).height();
                    var elemH = winH - 72;

                    window.setTimeout(function() {
                        angular.element(el).css({ 'height': elemH + 'px', 'min-height': elemH + 'px', 'overflow': 'auto' });
                    }, 50);

                });
            }
        }
    });