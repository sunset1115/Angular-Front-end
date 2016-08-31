'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'zingchart-angularjs',
      'ngAnimate',
      'uiSwitch',
      'ngCookies',
      'angularMoment',
      'ngSanitize'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                    'scripts/directives/menubar/menubar.js',
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'ui-switch',
                   files:["bower_components/angular-ui-switch/angular-ui-switch.min.js",
                          "bower_components/angular-ui-switch/angular-ui-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
    .state('dashboard.advert',{
        templateUrl:'views/dashboard/advertiser.html',
        url:'/advert',
        controller:'AdvertCtrl',
        resolve: {
            loadMyFile:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'chart.js',
                    files:[
                        'bower_components/angular-chart.js/dist/angular-chart.min.js',
                        'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
                $ocLazyLoad.load({
                    name:'sbAdminApp',
                    files:['scripts/controllers/advertContoller.js', 'scripts/services/advertiser.js', 'scripts/services/campaign.js']
                })
            }
        }
    })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'views/auth/login.html',
        url:'/login',
        controller: 'LoginCtrl',
        resolve: {
            loadMyFile: function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'sbAdminApp',
                    files: [
                        'scripts/controllers/auth/login.js',
                        'scripts/directives/utils/automiddle.js'
                    ]
                })
            }
        }
    })
        .state('register',{
            templateUrl:'views/auth/register.html',
            url:'/register',
            controller: 'RegisterCtrl',
            resolve: {
                loadMyFile: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/auth/register.js',
                            'scripts/directives/utils/automiddle.js'
                        ]
                    })
                }
            }
        })
        .state('reset',{
            templateUrl:'views/auth/reset.html',
            url:'/reset',
            controller: 'PasswordCtrl',
            resolve: {
                loadMyFile: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/auth/password.js',
                            'scripts/directives/utils/automiddle.js'
                        ]
                    })
                }
            }
        })
        .state('password',{
            templateUrl:'views/auth/password.html',
            url:'/password/:resetToken/:emailId',
            controller: 'PasswordCtrl',
            resolve: {
                loadMyFile: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/auth/password.js',
                            'scripts/directives/utils/automiddle.js'
                        ]
                    })
                }
            }
        })
        .state('license',{
            templateUrl:'views/auth/license.html',
            url:'/license',
            controller: 'AuthCtrl',
            resolve: {
                loadMyFile: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/login.js',
                            'scripts/directives/utils/automiddle.js',
                            'scripts/directives/header/license-header.js',
                            'scripts/directives/utils/auto-height.js'
                        ]
                    })
                }
            }
        })
      .state('dashboard.setting',{
        templateUrl:'views/dashboard/setting.html',
        url:'/setting',
        controller:'SettingCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/settingContoller.js']
            })
          }
        }
    })
    .state('dashboard.invoice',{
        templateUrl:'views/dashboard/invoice.html',
        url:'/invoice',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name:'sbAdminApp',
                  files:[
                      'scripts/controllers/invoiceContoller.js',
                      'scripts/directives/dashboard/twocalendar/twocalendar.js'
                  ]
              })
          }
        }
    });
  }]);

    
