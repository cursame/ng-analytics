'use strict';

define( function ( require ) {
    var GradesService       = require( 'grades/GradesService' );

    var GradesModule        = angular.module( 'GradesModule', []);

    GradesModule.factory( 'GradesService', [ 'BaseService', GradesService ]);
});