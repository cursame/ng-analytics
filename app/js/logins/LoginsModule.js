'use strict';

define( function ( require ) {
    var LoginsService       = require( 'logins/LoginsService' );

    var LoginsModule        = angular.module( 'LoginsModule', []);

    LoginsModule.factory( 'LoginsService', [ 'BaseService', LoginsService ] );
});