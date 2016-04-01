'use strict';

define( function () {
    return function ( BaseService ) {
        var AssignmentsService  = new BaseService( 'assignments' );

        return AssignmentsService;
    };
});