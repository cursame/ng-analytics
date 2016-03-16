'use strict';

define( function () {
    return function ( $scope, events, Session ) {
        Session.terminate( Session.getToken() );

        $scope.$on( events.LOGOUT_SUCCESS, function () {
            $scope.$emit( events.SYSTEM_MESSAGE, {
                msg     : 'alert.logout_success',
                type    : 'success'
            });
            $scope.$state.go( 'login' );
        });
    };
});