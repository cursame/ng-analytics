'use strict';

define( function ( require ) {
    var DiscussionsService      = require( 'discussions/DiscussionsService' );

    var DiscussionsModule       = angular.module( 'DiscussionsModule', []);

    DiscussionsModule.factory( 'DiscussionsService', [ 'BaseService', DiscussionsService ]);
});