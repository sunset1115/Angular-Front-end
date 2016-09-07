'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('InvoiceCtrl', ['$scope', '$timeout', 'Advertiser', '$uibModal', '$cookies', function ($scope, $timeout, Advertiser, $uibModal, $cookies) {
	  $scope.dateVal = { curDate: null, last: null };
	  $scope.calCallback = function (dateVal) {
		  var a = new Date(dateVal.last);
		  var b = new Date(dateVal.curDate);

		  Advertiser.getInvoice(a.getTime(), b.getTime())
			  .then(function (res) {
				  var retVal = res.data;
				  if (retVal.success) {
					  $scope.invoices = retVal.invoices;
				  }
			  });
	  };

	  $scope.showDate = function (timeVal) {
		  return moment(timeVal).format("MMM DD, YYYY");
	  }

	  $scope.viewInvoice = function (invoice) {
		  $cookies.remove('pdfUrl');
		  $cookies.put('pdfUrl', invoice.downloadUrl);
		  var modalInstance = $uibModal.open({
			  animation: true,
			  ariaLabelledBy: 'modal-title',
			  ariaDescribedBy: 'modal-body',
			  templateUrl: 'myModalContent.html',
			  size: 'bg',
			  windowClass: 'invoice'
		  });
	  }
}]);

angular.module('sbAdminApp')
	.controller('DocCtrl', ['$scope','$cookies', function ($scope, $cookies) {
		//$scope.pdfUrl= 'http://www.inkwelleditorial.com/pdfSample.pdf';
		$scope.pdfUrl = $cookies.get('pdfUrl');

		$scope.scroll = 0;
		$scope.loading = 'loading';

		$scope.getNavStyle = function(scroll) {
			if(scroll > 100) return 'pdf-controls fixed';
			else return 'pdf-controls';
		}

		$scope.onError = function(error) {
			console.log(error);
		}

		$scope.onLoad = function() {
			$scope.loading = '';
		}

		$scope.onProgress = function(progress) {

		}
	}]);