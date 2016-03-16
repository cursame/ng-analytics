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

    app.config([ '$httpProvider', 'config', function ( $httpProvider, config ) {
        $httpProvider.interceptors.push( [ '$rootScope', '$cookies', 'SignService', function ( $rootScope, $cookies, SignService ) {
            return {
                request     : function( config ) {
                    var external    = ( config.url.indexOf( 'http' ) != -1 ) ? true : false;

                    if ( external ) {
                        var holder  = '';

                        if ( config.method == "DELETE" || config.method == "GET" ) {
                            holder  = 'params';
                        } else {
                            holder  = 'data';
                        }
                        // Append the application signature to the api request
                        if ( config[holder] === undefined || config[holder] === null ) {
                            config[holder]   = {};
                        }

                        var auth    = SignService.sign();
                        config[holder].consumer  = auth.consumer;
                        config[holder].timestamp = auth.timestamp;
                        config[holder].signature = auth.signature;

                        var session = $cookies.getObject( 'session' );
                        if ( session ) {
                            config[holder].session   = session.token;
                        }
                    }

                    return config;
                }
            };
        }]);
    }]);

    return app;
});