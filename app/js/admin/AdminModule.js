'use strict';

define( function ( require ) {
    var AdminRouter         = require( 'admin/AdminRouter' );
    var AdminUsersCtrl      = require( 'admin/AdminUsersCtrl' );

    var AdminModule         = angular.module( 'AdminModule', []);

    AdminModule.config([ '$stateProvider', AdminRouter ]);

    AdminModule.controller( 'AdminUsersCtrl', [ '$scope', 'UsersService', AdminUsersCtrl ]);
});