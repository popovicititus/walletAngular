(function () {
    'use strict';

    var appName = 'wallet-app';
    var app = angular.module(appName, ['ngRoute', 'ngStorage']);

    app.config(function($routeProvider) {
        $routeProvider.
            when('/', {
                controller: 'walletCtrl',
                templateUrl: '/app/views/wallet.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    });
})();