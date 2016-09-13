'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('CampaignCreateCtrl', ['$scope', '$state', '$timeout', '$sce', 'Campaign', function ($scope, $state, $timeout, $sce, Camapign) {

	  $scope.campaign = {
		  name: '',
		  start: new Date(),
		  end: new Date()
	  };

	  // Disable weekend selection
	  function disabled(data) {
		  var date = data.date,
				  mode = data.mode;
		  //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
		  return false;
	  }

	  $scope.startOpened = false;
	  $scope.endOpened = false;

	  $scope.dateOptions = {
		  dateDisabled: null,
		  formatYear: 'yy',
		  startingDay: 1
	  };

	  $scope.openStartCal = function () {
		  $scope.startOpened = true;
	  }

	  $scope.openEndCal = function () {
		  $scope.endOpened = true;
	  }
  }]);