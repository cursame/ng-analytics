'use strict';

define( function () {
    return function ( $scope, Users, Stats, Courses ) {
        var _id         = null;

        $scope.order    = 'name';
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.query    = function () {
            Users.query({
                _id         : _id,
                expanded    : true,
                page        : $scope.page,
                per_page    : $scope.per_page,
                type        : 1
            }).$promise.then( function ( data ) {
                $scope.teachers = data;
                $scope.total    = Users.getTotal();

                for ( var i = 0; i < $scope.teachers.length; i++ ) {
                    $scope.teachers[i].stats    = Stats.getStats( $scope.teachers[i]._id );
                }
            });
        };
        $scope.courses  = Courses.query({
            limit   : 9999,
            select  : 'name teacher'
        });

        $scope.$watch( 'course', function ( course ) {
            if ( course ) {
                _id     = course.teacher;
            } else {
                _id     = null;
            }

            $scope.query();
        });
    };
});