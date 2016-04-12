'use strict';

define( function ( require ) {
    var UsersDetailsCtrl    = require( 'users/UsersDetailsCtrl' );
    var UsersListCtrl       = require( 'users/UsersListCtrl' );
    var UsersRemoveCtrl     = require( 'users/UsersRemoveCtrl' );
    var UsersRouter         = require( 'users/UsersRouter' );
    var UsersService        = require( 'users/UsersService' );

    var UsersModule         = angular.module( 'UsersModule', []);

    UsersModule.config([ '$stateProvider', UsersRouter ]);

    UsersModule.controller( 'UsersDetailsCtrl', [ '$scope', '$stateParams', 'UsersService', 'ActivitiesService', 'StatsStudentsService', UsersDetailsCtrl ] );

    UsersModule.controller( 'UsersListCtrl', [ '$scope', '$stateParams', 'UsersService', UsersListCtrl ] );

    UsersModule.controller( 'UsersRemoveCtrl', [ '$scope', '$stateParams', 'events', 'UsersService', UsersRemoveCtrl ] );

    UsersModule.factory( 'UsersService', [ 'BaseService', UsersService ] );
});