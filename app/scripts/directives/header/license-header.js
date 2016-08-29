'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('licenseHeader',function(){
		return {
        templateUrl:'scripts/directives/header/license-header.html',
        restrict: 'E',
        replace: true,
		link: function(scope, el, attrs) {
			angular.element(document.querySelector('body')).css({'background-color': '#5a5a5a'});
		}
    	}
	});


