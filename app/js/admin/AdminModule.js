'use strict';

define( function ( require ) {
    var AdminCreateCtrl     = require( 'admin/AdminCreateCtrl' );
    var AdminEditCtrl       = require( 'admin/AdminEditCtrl' );
    var AdminRouter         = require( 'admin/AdminRouter' );
    var AdminUsersCtrl      = require( 'admin/AdminUsersCtrl' );

    var AdminModule         = angular.module( 'AdminModule', []);

    AdminModule.config([ '$stateProvider', AdminRouter ]);

    AdminModule.controller( 'AdminCreateCtrl', [ '$scope', 'events', 'UsersService', 'NetworksService', AdminCreateCtrl ]);

    AdminModule.controller( 'AdminEditCtrl', [ '$scope', '$stateParams', 'events', 'UsersService', 'NetworksService', AdminEditCtrl ]);

    AdminModule.controller( 'AdminUsersCtrl', [ '$scope', 'UsersService', AdminUsersCtrl ]);
});