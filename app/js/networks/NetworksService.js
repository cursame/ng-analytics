'use strict';

define( function () {
    return function ( BaseService ) {
        var NetworksService     = new BaseService( 'networks' );

        return NetworksService;
    };
});