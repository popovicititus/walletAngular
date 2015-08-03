angular.module('wallet-app').controller('walletCtrl', function($scope, $localStorage){
    $scope.amount = "";
    $scope.errorMessage = "";
    $scope.actions = [
        {
            uiName: 'Add',
            callback: addAmount
        },
        {
            uiName: 'Subtract',
            callback: subtractAmount
        }
    ];
    $scope.selectedAction = $scope.actions[0];
    $scope.operations = $localStorage.operations || [];
    $scope.budget = $localStorage.budget || 0;
    initCurrency();

    $scope.doAction = function(){
        $scope.selectedAction.callback();
    };

    $scope.$on('reset', function() {
        $scope.operations = [];
        $scope.budget = 0;
        $scope.selectedCurrency = $scope.currencies[0];
        $scope.selectedAction = $scope.actions[0];
        delete $localStorage.operations;
        delete $localStorage.budget;
        delete $localStorage.selectedCurrency;
    });

    //automatically remove ui errors and reset the input after each successful operation
    $scope.$watch('budget', function(newVal, oldVal){
        if(newVal && (oldVal != newVal)){
            addToOperations(newVal - oldVal > 0 ? 'Addition' : 'Subtraction');
            $scope.amount = "";
            $scope.errorMessage = "";
        }
    });

    $scope.$watch('selectedCurrency', function(newVal, oldVal){
        if(oldVal != newVal){
            $localStorage.selectedCurrency = newVal;
        }
    });

    function initCurrency(){
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

        if($localStorage.selectedCurrency){
            //in case a currency is not supported no more, check that the value in local storage is still in the array of supported currencies
            for (var i=0, iLen=$scope.currencies.length; i<iLen; i++) {
                if ($scope.currencies[i].name == $localStorage.selectedCurrency.name) {$scope.selectedCurrency = $scope.currencies[i]; break}
            }
        }
        $scope.selectedCurrency = $scope.selectedCurrency || $scope.currencies[0];
    }

    function addAmount(){
        if(isNotANumber()){
            return false;
        }
        $scope.budget += $scope.amount;
        $localStorage.budget = $scope.budget;
    }

    function subtractAmount(){
        if(isNotANumber() || isNegativeBudget()){
            return false;
        }
        $scope.budget -= $scope.amount;
        $localStorage.budget = $scope.budget;
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

    //validation functions
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

})