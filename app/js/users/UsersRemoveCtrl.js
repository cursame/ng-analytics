'use strict';

define( function () {
    return function ( $scope, $stateParams, events, Users ) {
        var previous    = '';

        Users.remove( $stateParams.id );

        $scope.$on( '$stateChangeSuccess', function ( e, to, toParams, from ) {
            previous    = ( from.name != '' ) ? from.name : 'users.teachers';
        });
        $scope.$on( Users.getEvent( 'DELETED' ), function () {
            $scope.$emit( events.SYSTEM_MESSAGE, {
                msg     : 'alert.user_removed',
                type    : 'success'
            });

            $scope.$state.go( previous );
        });
    };
});