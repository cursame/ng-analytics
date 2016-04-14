'use strict';

define( function () {
    return function ( $scope, Users, Stats ) {
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.query    = function () {
            Users.query({
                expanded    : true,
                page        : $scope.page,
                per_page    : $scope.per_page,
                type        : 2
            }).$promise.then( function ( data ) {
                $scope.students = data;
                $scope.total    = Users.getTotal();

                for ( var i = 0; i < $scope.students.length; i++ ) {
                    $scope.students[i].stats    = Stats.getStats( $scope.students[i]._id );
                }
            });
        };

        $scope.query();
    };
});