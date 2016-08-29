'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the authentication
 */
angular.module('sbAdminApp')
.controller('PasswordCtrl', function($scope, Auth, $state, $timeout, $stateParams) {

    $scope.errflag = false;
    $scope.errmsg = "";
    $scope.disableFlag = true;

    $scope.forgetPwd = function forgetPwd() {
        Auth.forgot($scope.useremail)
            .then(function success(res) {
                var resVal = res.data;
                if (resVal.success) {
                    $scope.errflag = true;
                    $scope.errmsg = "Please Check your email for reset password";

                    $timeout(function() {
                        $state.go('login')
                    }, 5000);
                } else {
                    $scope.errflag = true;
                    $scope.errmsg = resVal.message;
                }
            });
    }

    $scope.$watch('confirmpwd', function (val) {
        if (val !== $scope.password) {
            $scope.errflag = true;
        } else {
            $scope.errflag = false;
        }
    });

    $scope.sendPwd = function (){
        if (!$scope.errflag) {
            var request = {
                'resetToken': $stateParams.resetToken,
                'emailId': $stateParams.emailId,
                'newPassword': $scope.password
            };

            Auth.resetPassword(request)
                .then(function (res) {
                    if (res.data.success) $state.go('login');
                    else {
                        $scope.errflag = true;
                        $scope.errmsg = res.data.message;
                    }
                });
        }
    }
});