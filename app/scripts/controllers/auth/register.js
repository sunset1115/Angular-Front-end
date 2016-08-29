'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the authentication
 */
angular.module('sbAdminApp')
.controller('RegisterCtrl', function($scope, Auth, $state) {

    $scope.errflag = false;
    $scope.errmsg = "";

    $scope.existEmail = false;
    $scope.existUsername = false;

    $scope.validEmail = function (user) {
        if (user.emailId) {
            Auth.checkEmail(user.emailId).then(cbEmail);
        }
    };

    $scope.validUsername = function (user) {
        if (user.userName)
            Auth.checkUsername(user.userName).then(cbUsername);

    };

    $scope.signup = function (user) {
        if ($scope.checked && !$scope.existEmail && !$scope.existUsername)
            Auth.register(user).then(cbSignup);
        else $scope.licenseAgree = true;
    };

    function cbUsername (res) {
        var resVal = res.data;
        $scope.existUsername = resVal.exist;
        $scope.userForm.$valid = false;
    };

    function cbEmail (res) {
        var resVal = res.data;
        $scope.existEmail = resVal.exist;
        $scope.userForm.$valid = false;
    };

    function cbSignup (res) {
        var resVal = res.data;
        if (!resVal.success) {
            $scope.errflag = true;
            $scope.errmsg = resVal.message;
        } else {
            $state.go('login');
        }
    };
});