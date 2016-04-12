'use strict';

define( function () {
    return function ( StatsTeachers ) {
        return {
            restrict    : 'E',
            scope       : {
                user    : '='
            },
            templateUrl : 'partials/courses/stats.html',
            link        : function ( scope ) {
                if ( scope.user ) {
                    scope.user.$promise.then( function () {
                        scope.stats = StatsTeachers.getStats( scope.user._id );
                    });
                } else {
                    scope.stats = StatsTeachers.getStats();
                }
            }
        };
    };
});