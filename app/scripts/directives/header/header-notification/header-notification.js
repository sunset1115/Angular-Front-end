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

			initNotification();

			function initNotification () {
				Advertiser.getNotification()
					.then(function (res){
						var retVal = res.data.notifications;
						$scope.notifies = retVal.filter(function (val) {
							return !val.seen;
						});
					});
			}

			$scope.getBeforeDay = function (item) {
				var dt = moment(item.dtStamp);
				var curDt = moment();
				var dif = moment.utc(moment(curDt,"DD/MM/YYYY HH:mm:ss").diff(moment(dt,"DD/MM/YYYY HH:mm:ss"))).format("HH");
				if (parseInt(dif)< 24) return "Today";
				else if (parseInt (dif) < 48) return "Yesterday";
				else return parseInt(dif)/24 + 'Days ago';
			}

			$scope.setSeen = function (item) {
				Advertiser.setNotiStatus(item.notificationId)
					.then(function (res) {
						if (res.data.success){
							initNotification();
						}
					});
			}

		}],
        replace: true,
    	}
	});


