(function () {
    'use strict';

    var appName = 'wallet-app';
    var app = angular.module(appName, ['ngRoute']);

    app.controller('walletCtrl', function($scope){

    })

    .config(function($routeProvider) {
        $routeProvider.
            when('/wallet', {
                controller: 'walletCtrl',
                templateUrl: '/app/views/wallet.html'
            }).
            otherwise({
                redirectTo: '/wallet'
            });
    });
})();

