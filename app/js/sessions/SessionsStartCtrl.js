'use strict';

define( function () {
    return function ( $scope, events, Session ) {
        $scope.login    = function () {
            Session.start( $scope.user );
        };

        $scope.$on( events.LOGIN_SUCCESS, function () {
            $scope.$emit( events.SYSTEM_MESSAGE, {
                msg     : 'Logged in successfully!',
                type    : 'success'
            });
        });
        $scope.$on( events.LOGIN_ERROR, function () {
            $scope.$emit( events.SYSTEM_MESSAGE, {
                msg     : 'alert.login_error',
                type    : 'error'
            });
        });
    };
});