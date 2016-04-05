'use strict';

define( function ( require ) {
    var ActivitiesService       = require( 'activities/ActivitiesService' );

    var ActivitiesModule        = angular.module( 'ActivitiesModule', []);

    ActivitiesModule.factory( 'ActivitiesService', [ 'BaseService', ActivitiesService ]);
});