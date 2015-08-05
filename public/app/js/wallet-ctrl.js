angular.module('wallet-app').controller('walletCtrl', function($scope, $localStorage){
    $scope.vm = {
        amount : 0,
        errorMessage : "",
        actions : [
            {
                uiName: 'Add',
                callback: addAmount
            },
            {
                uiName: 'Subtract',
                callback: subtractAmount
            }
        ],
        operations : $localStorage.operations || [],
        budget : $localStorage.budget || 0
    };
    $scope.vm.selectedAction = $scope.vm.actions[0];
    initCurrency();

    $scope.$on('reset', function() {
        $scope.vm.operations = [];
        $scope.vm.budget = 0;
        $scope.vm.amount = 0;
        $scope.vm.selectedCurrency = $scope.vm.currencies[0];
        $scope.vm.selectedAction = $scope.vm.actions[0];
        delete $localStorage.operations;
        delete $localStorage.budget;
        delete $localStorage.selectedCurrency;
    });

    //automatically remove error messages and reset the input after each successful operation
    $scope.$watch('vm.budget', function(newVal, oldVal){
        if(oldVal != newVal){
            addToOperations(newVal - oldVal > 0 ? 'Addition' : 'Subtraction');
            $scope.vm.amount = 0;
            $scope.vm.errorMessage = "";
        }
    });

    $scope.$watch('vm.selectedCurrency', function(newVal, oldVal){
        if(oldVal != newVal){
            $localStorage.selectedCurrency = newVal;
        }
    });

    function initCurrency(){
        $scope.vm.currencies = [{
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
            for (var i=0, iLen=$scope.vm.currencies.length; i<iLen; i++) {
                if ($scope.vm.currencies[i].name == $localStorage.selectedCurrency.name) {$scope.vm.selectedCurrency = $scope.vm.currencies[i]; break}
            }
        }
        $scope.vm.selectedCurrency = $scope.vm.selectedCurrency || $scope.vm.currencies[0];
    }

    function addAmount(){
        if(isNotANumber()){
            return false;
        }
        $scope.vm.budget += $scope.vm.amount;
        $localStorage.budget = $scope.vm.budget;
    }

    function subtractAmount(){
        if(isNotANumber() || isNegativeBudget()){
            return false;
        }
        $scope.vm.budget -= $scope.vm.amount;
        $localStorage.budget = $scope.vm.budget;
    }

    function addToOperations(type){
        $scope.vm.operations.push({
            amount: $scope.vm.amount,
            remainingBudget: $scope.vm.budget,
            type: type,
            date: new Date()
        });
        $localStorage.operations = $scope.vm.operations;
    }

    //validation functions
    var isNotANumber = function() {
        if (isNaN($scope.vm.amount) || $scope.vm.amount <= 0) {
            $scope.vm.errorMessage = "Please insert a valid amount";
            return true;
        }
        return false;
    };

    var isNegativeBudget = function() {
        if ($scope.vm.budget - $scope.vm.amount < 0) {
            $scope.vm.errorMessage = "The remaining budget cannot be negative";
            return true;
        }
        return false;
    };
});