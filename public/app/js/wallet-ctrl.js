angular.module('wallet-app').controller('walletCtrl', function($scope, $localStorage){
    var add = 'Addition';
    var subtract = 'Subtraction';
    $scope.currencies = [{
        "name": "GBP",
        "faSuffix": "gbp",
        "symbol": "£"
    }, {
        "name": "Euro",
        "faSuffix": "eur",
        "symbol": "€"
    }, {
        "name": "USD",
        "faSuffix": "usd",
        "symbol": "$"
    }];

    $scope.operations = $localStorage.operations || [];
    $scope.budget = $localStorage.budget || 0;
    $scope.selectedCurrency = $localStorage.selectedCurrency || $scope.currencies[0];
    $scope.amount = "";
    $scope.errorMessage = "";

    $scope.addAmount = function(){
        if(isNotANumber()){
            return false;
        }
        $scope.budget += $scope.amount;
        $localStorage.budget = $scope.budget;
        addToOperations(add);
        resetInputs();
    };

    $scope.subtractAmount = function(){
        if(isNotANumber() || isNegativeBudget()){
            return false;
        }
        $scope.budget -= $scope.amount;
        $localStorage.budget = $scope.budget;
        addToOperations(subtract);
        resetInputs();
    };

    $scope.changeCurrency = function(){
        $localStorage.selectedCurrency = $scope.selectedCurrency;
    };

    function resetInputs(){
        $scope.amount = "";
        $scope.errorMessage = "";
    }

    function addToOperations(type){
        $scope.operations.push({
            amount: $scope.amount,
            remainingBudget: $scope.budget,
            type: type,
            date: new Date()
        });
        $localStorage.operations = $scope.operations;
    }

    var isNotANumber = function() {
        if (isNaN($scope.amount) || $scope.amount <= 0) {
            $scope.errorMessage = "Please insert a valid amount";
            return true;
        }
        return false;
    };

    var isNegativeBudget = function() {
        if ($scope.budget - $scope.amount < 0) {
            $scope.errorMessage = "The remaining budget cannot be negative";
            return true;
        }
        return false;
    };

    $scope.$on('reset', function() {
        $scope.operations = $localStorage.operations = [];
        $scope.budget = "";
        $localStorage.budget = null;
    });
});