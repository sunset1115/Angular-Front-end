'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
		controller: ['$scope', 'Auth', 'Advertiser', '$state', function ($scope, Auth, Advertiser, $state) {
			Advertiser.getUserInfo()
				.then(function (res) {
					var retVal = res.data;
					if (retVal.success) {
						Auth.setUserdata(retVal.advertiser);
						$scope.userName = retVal.advertiser.userName;
					}
				});

			$scope.logout = function () {
				Auth.logout();
				$state.go('login');
			};

		}],
        replace: true,
    	}
	});


