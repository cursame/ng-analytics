'use strict';

define( function ( require ) {
    var DashboardBaseCtrl   = require( 'dashboard/DashboardBaseCtrl' );
    var DashboardRouter     = require( 'dashboard/DashboardRouter' );

    var DashboardModule     = angular.module( 'DashboardModule', []);

    DashboardModule.config([ '$stateProvider', DashboardRouter ]);

    DashboardModule.controller( 'DashboardBaseCtrl', [ '$rootScope', 'SessionsService', DashboardBaseCtrl ] );
});