'use strict';

define( function () {
    return function ( BaseService ) {
        var LoginsService   = new BaseService( 'logins' );

        return LoginsService;
    };
});