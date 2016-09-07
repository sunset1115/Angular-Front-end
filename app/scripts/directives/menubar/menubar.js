'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('menubar',['$location',function() {
    return {
      templateUrl:'scripts/directives/menubar/menubar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller: ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };

        $scope.goCampaign = function () {
          $state.go('campaigncreate.create');
        }
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };

        $rootScope.$on('$stateChangeStart', function (event, toState,   toParams, fromState, fromParams)
        {
            $scope.showCreateCampaignBtn = (toState.name === "dashboard.setting") || (toState.name === "dashboard.payment") || (toState.name === "dashboard.invoice");
        });

      }
    ]}
  }]);
