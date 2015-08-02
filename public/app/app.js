(function () {
    'use strict';

    var appName = 'wallet-app';
    var app = angular.module(appName, ['ngRoute']);

    app.controller('walletCtrl', function($scope){
        var add = 'Addition';
        var subtract = 'Subtraction';

        $scope.operations = [];
        $scope.budget = 50;
        $scope.amount = "";

        $scope.addAmount = function(){
            $scope.budget += $scope.amount;
            addToOperations(add);
            resetInputs();
        };

        $scope.subtractAmount = function(){
            $scope.budget -= $scope.amount;
            addToOperations(subtract);
            resetInputs();
        };

        function resetInputs(){
            $scope.amount = "";
        }

        function addToOperations(type){
            $scope.operations.push({
                amount: $scope.amount,
                remainingBudget: $scope.budget,
                type: type,
                date: new Date()
            })
        }
    });

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

