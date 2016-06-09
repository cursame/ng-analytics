'use strict';

define( function () {
    return function ( $scope, events, Users, Networks ) {
        $scope.networks = Networks.query({
            page        : 1,
            per_page    : 99999
        });
        $scope.user     = {
            type        : -1
        };
        $scope.create   = function () {
            Users.create( $scope.user );
        };

        $scope.$on( events.USERS_CREATED, function () {
            $scope.$emit( events.SYSTEM_MESSAGE, {
                msg     : 'alert.user_created',
                type    : 'success'
            });

            $scope.$state.go( 'administration.users' );
        });
    };
});