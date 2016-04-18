'use strict';

define( function ( require ) {
    var AnalyticsCoursesCtrl    = require( 'analytics/AnalyticsCoursesCtrl' );
    var AnalyticsGeneralCtrl    = require( 'analytics/AnalyticsGeneralCtrl' );
    var AnalyticsRouter         = require( 'analytics/AnalyticsRouter' );
    var AnalyticsStudentsCtrl   = require( 'analytics/AnalyticsStudentsCtrl' );
    var AnalyticsTeachersCtrl   = require( 'analytics/AnalyticsTeachersCtrl' );

    var AnalyticsModule         = angular.module( 'AnalyticsModule', []);

    AnalyticsModule.config([ '$stateProvider', AnalyticsRouter ]);

    AnalyticsModule.controller( 'AnalyticsGeneralCtrl', [ '$scope', AnalyticsGeneralCtrl ]);

    AnalyticsModule.controller( 'AnalyticsCoursesCtrl', [ '$scope', 'CoursesService', 'UsersService', 'StatsTeachersService', AnalyticsCoursesCtrl ] );

    AnalyticsModule.controller( 'AnalyticsStudentsCtrl', [ '$scope', 'UsersService', 'StatsStudentsService', AnalyticsStudentsCtrl ] );

    AnalyticsModule.controller( 'AnalyticsTeachersCtrl', [ '$scope', 'UsersService', 'StatsTeachersService', 'CoursesService', AnalyticsTeachersCtrl ] );
});