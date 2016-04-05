'use strict';

define( function () {
    return function ( BaseService ) {
        var CommentsService     = new BaseService( 'comments' );

        return CommentsService;
    };
});