'use strict';

define( function ( require ) {
    var NetworksService     = require( 'networks/NetworksService' );

    var NetworksModule      = angular.module( 'NetworksModule', []);

    NetworksModule.factory( 'NetworksService', [ 'BaseService', NetworksService ]);
});