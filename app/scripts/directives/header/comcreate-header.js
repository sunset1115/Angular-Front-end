'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('comcreateHeader',function(){
		return {
        templateUrl:'scripts/directives/header/comcreate-header.html',
        restrict: 'E',
        replace: true,
    	}
	});


