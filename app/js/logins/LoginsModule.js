'use strict';

define( function ( require ) {
    var LoginsChartDirective    = require( 'logins/LoginsChartDirective' );
    var LoginsService           = require( 'logins/LoginsService' );

    var LoginsModule            = angular.module( 'LoginsModule', []);

    LoginsModule.directive( 'loginsChart', [ '$translate', 'LoginsService', LoginsChartDirective ] );

    LoginsModule.factory( 'LoginsService', [ 'BaseService', LoginsService ] );
});