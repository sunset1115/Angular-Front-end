'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.service:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .service('Advertiser',['$http', 'Auth', function($http, Auth) {
        var serverUrl = "http://api.stage.plakc.club:9000/api/v2/advertiser/";
        this.getUserInfo = function () {
            var authToken = Auth.getCurrntToken();
            console.log(authToken);
            return $http({
                "url": serverUrl,
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "Authorization": authToken
                }
            });
        };

        this.getGraphdata = function (begin_date, end_date) {
            var authToken = Auth.getCurrntToken();
            return $http({
                "url": 'http://api.stage.plakc.club:9000/api/v2/advertiser/spent',
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "Authorization": authToken
                },
                "data": {
                    "start": begin_date,
                    "end": end_date
                }
            });
        }
    }]);
