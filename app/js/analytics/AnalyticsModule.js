'use strict';

define( function ( require ) {
    var AnalyticsRouter     = require( 'analytics/AnalyticsRouter' );

    var AnalyticsModule     = angular.module( 'AnalyticsModule', []);

    AnalyticsModule.config([ '$stateProvider', AnalyticsRouter ]);
});