'use strict';

define( function ( require ) {
    require( 'config' );
    require( 'events' );
    require( 'common/CommonModule' );
    require( 'sessions/SessionsModule' );

    var app     = angular.module( 'ngAnalytics', [
            'ngCookies',
            'ngResource',
            'ui.router',
            'config',
            'events',
            'CommonModule',
            'SessionsModule'
        ]);

    return app;
});