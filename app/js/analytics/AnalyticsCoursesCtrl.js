'use strict';

define( function () {
    return function ( $scope, Courses, Stats ) {
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.query    = function () {
            Courses.query({
                expanded    : true,
                page        : $scope.page,
                per_page    : $scope.per_page,
                select      : 'name students teacher'
            }).$promise.then( function ( data ) {
                $scope.courses  = data;
                $scope.total    = Courses.getTotal();

                for ( var i = 0; i < $scope.courses.length; i++ ) {
                    $scope.courses[i].stats     = Stats.getStats( null, $scope.courses[i]._id );
                }
            });
        };

        $scope.query();
    };
});