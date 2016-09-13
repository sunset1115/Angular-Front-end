'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.service:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .service('Advertiser',['$http', 'Auth', '$state', function($http, Auth, $state) {
        var serverUrl = "http://api.stage.plakc.club:9000/api/v2/advertiser/";
        this.authToken = null;
        this.init = function() {
            this.authToken = Auth.getCurrntToken();
            //if (!this.authToken)
                //$state.go('login');
        };

        this.getUserInfo = function () {
            var authToken = Auth.getCurrntToken();
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
        };

        this.getInvoice = function (begin_date, end_date) {
            var authToken = Auth.getCurrntToken();
            return $http({
                "url": 'http://api.stage.plakc.club:9000/api/v2/advertiser/invoices',
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

        this.putBilling = function (address) {
            var authToken = Auth.getCurrntToken();
            return $http({
                "url": 'http://api.stage.plakc.club:9000/api/v2/advertiser',
                "method": "PUT",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "Authorization": authToken
                },
                "data": address
            });
        }

        this.getNotification = function () {
            this.init();
            return $http({
                "url": 'http://api.stage.plakc.club:9000/api/v2/advertiser/notification?start=1212121212121&end=1212121212121',
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "Authorization": this.authToken
                }
            });
        }

        this.setNotiStatus = function (id) {
            this.init();
            return $http({
                "url": 'http://api.stage.plakc.club:9000/api/v2/advertiser/notification/seen',
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "Authorization": this.authToken
                },
                data: {
                    notificationId: id
                }
            });
        }
    }]);
