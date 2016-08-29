'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the authentication
 */
angular.module('sbAdminApp')
.controller('LoginCtrl', function($scope, Auth, $state) {

    $scope.errflag = false;
    $scope.errmsg = "";
    $scope.login = function login() {
        Auth.login({userName: $scope.userName, password: $scope.password})
            .then(function success(res) {
                var retVal = res.data;
                if (!retVal.success) {
                    $scope.errflag = true;
                    $scope.errmsg = retVal.message;
                } else {
                    Auth.authentication(retVal.token);
                    $state.go('dashboard.advert');
                }
            });
    };
});