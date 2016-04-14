'use strict';

define( function () {
    return function ( BaseService ) {
        var GradesService       = new BaseService( 'grades' );

        return GradesService;
    };
});