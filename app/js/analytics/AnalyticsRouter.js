'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'analytics', {
                abstract    : true,
                parent      : 'dashboard',
                url         : 'analytics',
                views       : {
                    'main-container'    : {
                        templateUrl     : 'partials/analytics/base.html'
                    }
                }
            })
            .state( 'analytics.general', {
                url     : '/general',
                views   : {
                    'analytics-content' : {
                        templateUrl     : 'partials/analytics/general.html',
                        controller      : 'AnalyticsGeneralCtrl'
                    }
                }
            })
            .state( 'analytics.courses', {
                url     : '/courses',
                views   : {
                    'analytics-content' : {
                        templateUrl     : 'partials/analytics/courses.html',
                        controller      : 'AnalyticsCoursesCtrl'
                    }
                }
            })
            .state( 'analytics.teachers', {
                url     : '/teachers',
                views   : {
                    'analytics-content' : {
                        templateUrl     : 'partials/analytics/teachers.html',
                        controller      : 'AnalyticsTeachersCtrl'
                    }
                }
            });
    };
});