'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('SettingCtrl', ['$scope', '$timeout', 'Advertiser', 'toastr', function ($scope, $timeout, Advertiser, toastr) {
	  $scope.save = function (setting) {
		  Advertiser.putBilling({address: setting})
			  .then(function (res) {
				  if (res.data.success) {
					  toastr.success(res.data.message, 'Saving Status', {
						  positionClass: 'toast-top-center',
						  timeOut: 5000,
						  isOpened: true
					  });
				  } else {
					  toastr.error(res.data.message, 'Saving Error', {
						  positionClass: 'toast-top-center',
						  timeOut: 5000,
						  isOpened: true
					  });
				  }
			  });
	  }
}]);