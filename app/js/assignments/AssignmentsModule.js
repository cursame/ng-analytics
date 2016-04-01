'use strict';

define( function ( require ) {
    var AssignmentsService      = require( 'assignments/AssignmentsService' );

    var AssignmentsModule       = angular.module( 'AssignmentsModule', []);

    AssignmentsModule.factory( 'AssignmentsService', [ 'BaseService', AssignmentsService ]);
});