'use strict';

define( function ( require ) {
    var CoursesService          = require( 'courses/CoursesService' );
    var CoursesStatsDirective   = require( 'courses/CoursesStatsDirective' );

    var CoursesModule           = angular.module( 'CoursesModule', []);

    CoursesModule.directive( 'coursesStats', [ 'StatsTeachersService', CoursesStatsDirective ] );

    CoursesModule.factory( 'CoursesService', [ 'BaseService', CoursesService ] );
});