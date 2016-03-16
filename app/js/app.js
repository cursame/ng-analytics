'use strict';

define( function ( require ) {
    require( 'common/CommonModule' );
    require( 'sessions/SessionsModule' );

    var app     = angular.module( 'ngAnalytics', [
            'ngCookies',
            'ui.router',
            'CommonModule',
            'SessionsModule'
        ]);

    return app;
});