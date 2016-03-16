'use strict';

define( function ( require ) {
    var SessionsRouter      = require( 'sessions/SessionsRouter' );

    var SessionsModule      = angular.module( 'SessionsModule', []);

    SessionsModule.config([ '$stateProvider', SessionsRouter ]);
});