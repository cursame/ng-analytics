'use strict';

define( function ( require ) {
    var AdminRouter         = require( 'admin/AdminRouter' );

    var AdminModule         = angular.module( 'AdminModule', []);

    AdminModule.config([ '$stateProvider', AdminRouter ]);
});