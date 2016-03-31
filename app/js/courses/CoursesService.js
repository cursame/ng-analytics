'use strict';

define( function () {
    return function ( BaseService ) {
        var CoursesService  = new BaseService( 'courses' );

        return CoursesService;
    };
});