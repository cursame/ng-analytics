'use strict';

define( function ( require ) {
    var CommentsService     = require( 'comments/CommentsService' );

    var CommentsModule      = angular.module( 'CommentsModule', []);

    CommentsModule.factory( 'CommentsService', [ 'BaseService', CommentsService ]);
});