angular.module('wallet-app').directive('focusedInput', function () {
    return {
        restrict: 'A',
        link: function (scope, element ) {
            element.on('click', function () {
                this.select()
            });
        }
    };
});