'use strict';

define( function () {
    return function ( $scope, $stateParams, Users, Activities, StatsStudents, Courses ) {
        $scope.user             = Users.get( $stateParams.id );
        $scope.page             = 1;
        $scope.per_page         = 10;

        $scope.$on( Activities.getEvent( 'QUERIED' ), function () {
            $scope.totalActivities  = Activities.getTotal();
        });
        $scope.$on( Users.getEvent( 'RETRIEVED' ), function () {
            switch ( $scope.user.type ) {
                case 1 :
                    $scope.queryActivities  = function () {
                        $scope.activities   = Activities.query({
                            expanded    : true,
                            page        : $scope.page,
                            per_page    : $scope.per_page,
                            teacher     : $scope.user._id
                        });
                    };
                    break;
                case 2 :
                    $scope.courses          = Courses.query({
                        per_page    : 9999,
                        select      : 'name',
                        students    : $scope.user._id
                    });
                    $scope.queryActivities  = function () {
                        $scope.activities   = Activities.query({
                            expanded    : true,
                            page        : $scope.page,
                            per_page    : $scope.per_page,
                            user        : $scope.user._id
                        });
                    };

                    $scope.stats    = StatsStudents.getStats( $scope.user._id );
                    break;
            }

            if ( $scope.user.$resolved && $scope.queryActivities != undefined ) {
                $scope.queryActivities();
            }
        });
        $scope.$watch( 'course', function ( course ) {
            if ( course !== undefined ) {
                $scope.stats    = StatsStudents.getStats( $scope.user._id, course );
            }
        });
    };
});