angular.module('wallet-app').controller('walletCtrl', function($scope){
    var add = 'Addition';
    var subtract = 'Subtraction';

    $scope.operations = [];
    $scope.budget = 50;
    $scope.amount = "";
    $scope.errorMessage = "";

    $scope.addAmount = function(){
        if(isNotANumber()){
            return false;
        }
        $scope.budget += $scope.amount;
        addToOperations(add);
        resetInputs();
    };

    $scope.subtractAmount = function(){
        if(isNotANumber() || isNegativeBudget()){
            return false;
        }
        $scope.budget -= $scope.amount;
        addToOperations(subtract);
        resetInputs();
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
        })
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
});