'use strict';

define( function ( require ) {
    var SessionsRouter      = require( 'sessions/SessionsRouter' );
    var SessionsService     = require( 'sessions/SessionsService' );
    var SessionsStartCtrl   = require( 'sessions/SessionsStartCtrl' );

    var SessionsModule      = angular.module( 'SessionsModule', []);

    SessionsModule.config([ '$stateProvider', SessionsRouter ]);

    SessionsModule.controller( 'SessionsStartCtrl', [ '$scope', 'events', 'SessionsService', SessionsStartCtrl ] );

    SessionsModule.factory( 'SessionsService', [ '$rootScope', '$resource', '$cookies', 'config', 'events', 'UsersService', SessionsService ] );
});