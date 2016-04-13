'use strict';

define( function () {
    return function ( $scope, Courses ) {
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.query    = function () {
            $scope.courses  = Courses.query({
                expanded    : true,
                page        : $scope.page,
                per_page    : $scope.per_page
            });
        };

        $scope.$on( Courses.getEvent( 'QUERIED' ), function () {
            $scope.total    = Courses.getTotal();
        });

        $scope.query();
    };
});