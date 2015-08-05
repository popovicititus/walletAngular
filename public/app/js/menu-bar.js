angular.module('wallet-app').directive('menuBar', [
    '$rootScope',
    function( $rootScope ) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/app/views/menu-bar.html',
            link: function( scope ) {
                scope.reset = function() {
                    $rootScope.$broadcast('reset');
                    return false;
                };
            }
        };
    }
]);