'use strict';

define( function () {
    return function ( $scope, $stateParams, Users ) {
        $scope.users    = Users.query({
            type        : $stateParams.type
        });
    };
});