'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('twoCalendar',function() {
        return {
            templateUrl:'scripts/directives/dashboard/twocalendar/twocalendar.html',
            restrict: 'E',
            replace: true,
            scope: {
                updateCallback: '&'
            },
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                var selDateRange = 0;
                var curDate = null;
                var last = null;

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
                            last = moment().subtract(30, 'd');
                            break;
                        case 2:
                            last = moment().subtract(7, 'd');
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
                        max1 = last.clone().endOf('month').toDate();
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

                };
                function showCalendarValue() {
                    $scope.searchDate = last.format("MMM DD, YYYY") + ' - ' + curDate.format("MMM DD, YYYY");
                    $scope.updateCallback({dateVal: {curDate: curDate, last: last}});
                };

                $scope.closeCalendar = function (flag) {
                    if (flag) {
                        showCalendarValue();
                    }
                    $scope.popoverFlag = false;
                }

                $scope.selRange(2);
                showCalendarValue();
            }]
        }

  });
