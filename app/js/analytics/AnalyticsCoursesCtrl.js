'use strict';

define( function () {
    return function ( $scope, Courses, Users, Stats ) {
        $scope.filters  = {};
        $scope.order    = 'name';
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.query    = function () {
            Courses.query({
                expanded    : true,
                page        : $scope.page,
                per_page    : $scope.per_page,
                select      : 'name students teacher',
                teacher     : $scope.teacher
            }).$promise.then( function ( data ) {
                $scope.courses  = data;
                $scope.total    = Courses.getTotal();

                for ( var i = 0; i < $scope.courses.length; i++ ) {
                    $scope.courses[i].stats     = Stats.getStats( null, $scope.courses[i]._id );
                }
            });
        };
        $scope.teachers = Users.query({
            limit   : 99999,
            select  : 'name',
            type    : 1
        });

        $scope.$watch( 'teacher', function ( teacher ) {
            if ( teacher !== undefined ) {
                $scope.query();
            }
        });

        $scope.query();
    };
});