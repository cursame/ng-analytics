'use strict';

define( function ( require ) {
    var SessionsRouter      = require( 'sessions/SessionsRouter' );
    var SessionsService     = require( 'sessions/SessionsService' );

    var SessionsModule      = angular.module( 'SessionsModule', []);

    SessionsModule.config([ '$stateProvider', SessionsRouter ]);

    SessionsModule.factory( 'SessionsService', [ '$rootScope', '$resource', '$cookies', 'config', 'events', 'UsersService', SessionsService ] );
});