'use strict';

define( function () {
    return function ( $scope, Users, Stats, Courses ) {
        var _ids        = null;

        $scope.order    = 'name';
        $scope.page     = 1;
        $scope.query    = function () {
            Users.query({
                $or         : _ids,
                expanded    : true,
                page        : $scope.page,
                per_page    : 999999,
                type        : 2
            }).$promise.then( function ( data ) {
                $scope.students = data;
                $scope.total    = Users.getTotal();

                for ( var i = 0; i < $scope.students.length; i++ ) {
                    $scope.students[i].stats    = Stats.getStats( $scope.students[i]._id );
                }
            });
        };
        $scope.courses  = Courses.query({
            limit   : 9999,
            select  : 'name students'
        });

        $scope.$watch( 'course', function ( course ) {
            if ( course ) {
                _ids    = [];
                for ( var i = 0; i < course.students.length; i++ ) {
                    _ids.push({
                        _id     : course.students[i]
                    });
                }
            } else {
                _ids    = null;
            }

            $scope.query();
        });
    };
});