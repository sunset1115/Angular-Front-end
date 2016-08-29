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

		  $scope.selRange(1);
		  showCalendarValue();
	  };

	  $scope.selRange = function (ind) {
		  selDateRange = ind;
		  curDate = moment();
		  last = null;

		  $scope.showItemIcon = [false, false, false, false, false];
		  $scope.showItemIcon[ind] = true;

		  switch (ind) {
			  case 0:
				  last = moment().date(1);
				  break;
			  case 1:
				  last = curDate.clone().subtract(30, 'd');
				  break;
			  case 2:
				  last = moment().subtract(6, 'd');
				  break;
			  case 3:
				  last = moment().subtract(1, 'd');
				  break;
			  default:
				  last = moment();
				  break;
		  }
		  var min1 = last.toDate();
		  var min2 = min1;
		  var max1 = curDate.toDate();
		  var max2 = max1;
		  if (moment(curDate).month() !== moment(last).month()) {
			  max1 = last.endOf('month').toDate();
			  min2 = curDate.clone().date(1).toDate();
		  }

		  $scope.cal1options = {
			  minDate: min1,
			  maxDate: max1,
			  initDate: moment().subtract(1, 'months').toDate(),
			  maxMode: 'day',
			  showWeeks: false
		  };

		  $scope.cal2options = {
			  minDate: min2,
			  maxDate: max2,
			  initDate: moment().toDate(),
			  maxMode: 'day',
			  showWeeks: false
		  };
	  }

	  // draw graph;
	  function drawGraph () {
		  var a = new Date(last);
		  var b = new Date(curDate);
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

	  function showCalendarValue() {
		  $scope.searchDate = last.format("MMM DD, YYYY") + ' - ' + curDate.format("MMM DD, YYYY");
		  drawGraph();
	  }

	  $scope.closeCalendar = function (flag) {
		  if (flag) {
			  showCalendarValue();
		  }
		  $scope.popoverFlag = false;
	  }

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
  }]);