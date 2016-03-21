'use strict';

define( function ( require ) {
    var UsersRouter     = require( 'users/UsersRouter' );
    var UsersService    = require( 'users/UsersService' );

    var UsersModule     = angular.module( 'UsersModule', []);

    UsersModule.config([ '$stateProvider', UsersRouter ]);

    UsersModule.factory( 'UsersService', [ 'BaseService', UsersService ] );
});