'use strict';

define( function ( require ) {
    var UsersListCtrl   = require( 'users/UsersListCtrl' );
    var UsersRouter     = require( 'users/UsersRouter' );
    var UsersService    = require( 'users/UsersService' );

    var UsersModule     = angular.module( 'UsersModule', []);

    UsersModule.config([ '$stateProvider', UsersRouter ]);

    UsersModule.controller( 'UsersListCtrl', [ '$scope', '$stateParams', 'UsersService', UsersListCtrl ] );

    UsersModule.factory( 'UsersService', [ 'BaseService', UsersService ] );
});