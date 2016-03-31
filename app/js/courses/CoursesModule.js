'use strict';

define( function ( require ) {
    var CoursesService      = require( 'courses/CoursesService' );

    var CoursesModule       = angular.module( 'CoursesModule', []);

    CoursesModule.factory( 'CoursesService', [ 'BaseService', CoursesService ] );
});