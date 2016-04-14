'use strict';

define( function ( require ) {
    var AnalyticsCoursesCtrl    = require( 'analytics/AnalyticsCoursesCtrl' );
    var AnalyticsGeneralCtrl    = require( 'analytics/AnalyticsGeneralCtrl' );
    var AnalyticsRouter         = require( 'analytics/AnalyticsRouter' );
    var AnalyticsTeachersCtrl   = require( 'analytics/AnalyticsTeachersCtrl' );

    var AnalyticsModule         = angular.module( 'AnalyticsModule', []);

    AnalyticsModule.config([ '$stateProvider', AnalyticsRouter ]);

    AnalyticsModule.controller( 'AnalyticsGeneralCtrl', [ '$scope', AnalyticsGeneralCtrl ]);

    AnalyticsModule.controller( 'AnalyticsCoursesCtrl', [ '$scope', 'CoursesService', 'StatsTeachersService', AnalyticsCoursesCtrl ] );

    AnalyticsModule.controller( 'AnalyticsTeachersCtrl', [ '$scope', 'UsersService', 'StatsTeachersService', AnalyticsTeachersCtrl ] );
});