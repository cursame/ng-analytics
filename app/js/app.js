'use strict';

define( function ( require ) {
    require( 'sessions/SessionsModule' );

    var app     = angular.module( 'ngAnalytics', [
            'ui.router',
            'SessionsModule'
        ]);

    return app;
});