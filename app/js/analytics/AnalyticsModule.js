'use strict';

define( function ( require ) {
    var AnalyticsGeneralCtrl    = require( 'analytics/AnalyticsGeneralCtrl' );
    var AnalyticsRouter         = require( 'analytics/AnalyticsRouter' );

    var AnalyticsModule         = angular.module( 'AnalyticsModule', []);

    AnalyticsModule.config([ '$stateProvider', AnalyticsRouter ]);

    AnalyticsModule.controller( 'AnalyticsGeneralCtrl', [ '$scope', '$translate', 'LoginsService', AnalyticsGeneralCtrl ]);
});