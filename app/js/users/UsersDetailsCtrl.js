'use strict';

define( function () {
    return function ( $scope, $stateParams, Users ) {
        $scope.user     = Users.get( $stateParams.id );
        $scope.dateOpts = {
            showWeeks   : false
        };
    };
});