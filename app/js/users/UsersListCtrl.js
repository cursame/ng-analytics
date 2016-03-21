'use strict';

define( function () {
    return function ( $scope, $stateParams, Users ) {
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.name     = '';
        $scope.query    = function () {
            $scope.users    = Users.query({
                name        : $scope.name,
                page        : $scope.page,
                per_page    : $scope.per_page,
                type        : $stateParams.type
            });
        };

        $scope.$on( Users.getEvent( 'QUERIED' ), function () {
            $scope.total    = Users.getTotal();
        });

        $scope.query();
    };
});