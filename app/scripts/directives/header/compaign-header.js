'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('compaignHeader',function(){
		return {
        templateUrl:'scripts/directives/header/compaign-header.html',
        restrict: 'E',
        replace: true,
    	}
	});


