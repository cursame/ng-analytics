'use strict';

define( function ( require ) {
    require( 'config' );
    require( 'events' );
    require( 'common/CommonModule' );
    require( 'courses/CoursesModule' );
    require( 'dashboard/DashboardModule' );
    require( 'logins/LoginsModule' );
    require( 'sessions/SessionsModule' );
    require( 'users/UsersModule' );

    var app     = angular.module( 'ngAnalytics', [
            'chart.js',
            'ngCookies',
            'ngResource',
            'ui.bootstrap.datepicker',
            'ui.bootstrap.pagination',
            'ui.bootstrap.tpls',
            'ui.router',
            'config',
            'events',
            'CommonModule',
            'CoursesModule',
            'DashboardModule',
            'LoginsModule',
            'SessionsModule',
            'UsersModule'
        ]);

    app.run([ '$rootScope', '$state', '$location', function ( $rootScope, $state, $location ) {
        $rootScope.$state   = $state;

        if ( $location.url() == '' ) {
            $state.go( 'dashboard' );
        }
    }]);

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