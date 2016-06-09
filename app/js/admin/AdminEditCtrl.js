'use strict';

define( function () {
    return function ( $scope, $stateParams, events, Users, Networks ) {
        $scope.networks = Networks.query({
            page        : 1,
            per_page    : 99999
        });
        $scope.user     = Users.get( $stateParams.id );
        $scope.create   = function () {
            Users.update( $stateParams.id, $scope.user );
        };

        $scope.$on( events.USERS_RETRIEVED, function () {
            $scope.user.pass    = '';
        });
        $scope.$on( events.USERS_UPDATED, function () {
            $scope.$emit( events.SYSTEM_MESSAGE, {
                msg     : 'alert.user_updated',
                type    : 'success'
            });

            $scope.$state.go( 'administration.users' );
        });
    };
});