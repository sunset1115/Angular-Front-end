'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.service:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .service('Auth',['$http', '$cookies', function($http, $cookies) {
        var serverUrl = "http://api.stage.plakc.club:9000/api/v2/advertiser/";
        return {
            authentication: function (newToken) {
                $cookies.remove('authToken');
                $cookies.put('authToken', newToken);
            },

            getCurrntToken: function (){
                return $cookies.get('authToken');
            },

            setUserdata: function (user) {
                $cookies.remove('userdata');
                $cookies.put('userdata', user);
            },

            getUserdata: function () {
                return $cookies.get('userdata');
            },

            logout: function () {
                $cookies.remove('authToken');
                var token = $cookies.get('authToken');
            },

            login: function(user) {
                var req = {
                    "url": serverUrl + 'login',
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    "data": {
                        "userName": user.userName,
                        "password": user.password
                    }
                };
                return $http(req);
            },

            forgot: function(useremail) {
                var req = {
                    "url": 'http://api.stage.plakc.club:9000/api/v2/forgotpassword',
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    "data": {
                        "emailId": useremail
                    }
                };

                return $http(req);
            },

            checkEmail: function (emailId) {
                var req = {
                    "url": serverUrl + 'email',
                    "method": "GET",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    "params": {
                        "emailId": emailId
                    }
                };

                return $http(req);
            },

            checkUsername: function (username) {
                var req = {
                    "url": serverUrl + 'username',
                    "method": "GET",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    "params": {
                        "userName": username
                    }
                };

                return $http(req);
            },

            register: function (user) {
                var req = {
                    "url": serverUrl,
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    "data": user
                };

                return $http(req);
            },

            resetPassword: function(requestData) {
                var req = {
                    "url": 'api.stage.plakc.club:9000/api/v2/forgotpassword',
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    "data": requestData
                };

                return $http(req);
            }
        }
    }]);
