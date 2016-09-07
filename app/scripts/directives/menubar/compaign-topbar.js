'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('compaignTopbar',['$location',function() {
    return {
      templateUrl:'scripts/directives/menubar/compaign-topbar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller: ['$scope', '$rootScope', function($scope, $rootScope){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };

        $rootScope.$on('$stateChangeStart', function (event, toState,   toParams, fromState, fromParams)
        {
            $scope.showCreateCampaignBtn = (toState.name === "dashboard.setting") || (toState.name === "dashboard.invoice");
        });

      }
    ]}
  }]);
