'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('AdvertCtrl', ['$scope', '$state', '$timeout', 'Advertiser', '$sce', 'Campaign', function ($scope, $state, $timeout, Advertiser, $sce, Camapign) {

	  var userInfo = null;
	  $scope.begin_date = null;
	  $scope.end_date = null;
	  $scope.popoverFlag = false;
	  $scope.showItemIcon = [false, false, false, false, false];
	  var curDate = null;
	  var last = null;
	  var selDateRange = 2;  //0-this month, 1-last 30 days, 2-last 7 days, 3- yesterday,4 - Today
	  var seedInd = 0;

	  $scope.init = function() {
		  showCampaign();
		  Advertiser.getUserInfo()
				  .then(function (res) {
					  if (res.data.success) {
						  userInfo = res.data.advertiser;
						  $scope.user = {
							  name: userInfo.userName,
							  advertiserId: userInfo.advertiserId,
							  balance: userInfo.currency + ' ' + userInfo.balance,
							  totalLiveCampaign: userInfo.totalLiveCampaign
						  };
					  } else {
						  $state.go('login');
					  }
				  }, function (err) {
					  $state.go('login');
				  });

		  $scope.calCallback = drawGraph;
		  $scope.selSort(0);
	  };

	  // draw graph;
	  function drawGraph (calVal) {
		  var a = new Date(calVal.last);
		  var b = new Date(calVal.curDate);
		  Advertiser.getGraphdata(a.getTime(),b.getTime())
			  .then(function (res) {
				  var retVal = res.data;
				  if (retVal.success) {
					  var graphData = [];
					  var totalSpent = 0;
					  angular.forEach(retVal.daily, function(val){
						  graphData.push([val.dtStamp, val.amountSpent]);
						  totalSpent += val.amountSpent;
					  });

					  var delayDays = Math.round((b - a)/(24*3600*1000));
					  $scope.delayDays = delayDays==0? 1: delayDays + 1;
					  $scope.totalSpent = totalSpent;

					  $scope.myJson = {
						  "type": "bar",
						  "utc": true, /* Set to UTC time. */
						  "scale-x": { /* Scale object, set up to display as a time-series scale. Read our Time-Series Scale section further below for more information. */
							  "min-value": graphData[0][0],
							  "step": "day",
							  "transform": {
								  "type": "date",
								  "all": "%d, %M"
							  }
						  },
						  "scale-y": {
							  "label": {
								  "text": 'INR (Rs) Spent'
							  }
						  },
						  "series": [
							  {"values": graphData}
						  ]
					  };
				  }
			  });
	  };

	  /**
	   * ========= start slide part =========
	   * $scope.s_info: slide informations;
       */

	  $scope.s_info = {
		  myInterval: '5000',
		  noWrapSlides: false,
		  active: 0
	  };

	  $scope.s_info.slides = [
		  {'text': 'hell', 'image': 'http://lorempixel.com/400/200/food',id:0},
		  {'text': 'sadas', 'image': 'http://lorempixel.com/400/200/people', id:1}
	  ];

	  // ======== end slide part =========

	  /**
	   * -------- campaign table ---------
	   */

	  $scope.createCampaign = function () {
		  $state.go('campaigncreate.create');
	  }

	  function showCampaign() {
		  Camapign.getAll()
			  .then(function (res) {
				  var retVal = res.data;
				  if (retVal.success) {
					  $scope.campaigns = retVal.campaigns;
				  }
			  });

	  };

	  $scope.showDate = function (timeVal) {
		  return moment(timeVal).format("MMM DD, YYYY");
	  }

	  $scope.selSort = function (ind) {
		  seedInd = ind;
		  $scope.showSortItem = [false, false, false, false, false, false];
		  $scope.showSortItem[ind] = true;
		  $scope.sortPopoverFlag = false;
		  sorting();
	  }

	  $scope.$watch('sortSeed', function (val) {
		  sorting();
	  });

	  function sorting() {
		  var seed = $scope.sortSeed;
		  var tempArr = $scope.campaigns;
		  var retArr = [];
		  angular.forEach(tempArr, function(row) {
			  var temp = row[seed];
			  console.log(temp);
			  if (temp.indexOf(seed) >= 0) retArr.push(row);
		  });

		  $scope.compaigns = retArr;
	  }
  }]);